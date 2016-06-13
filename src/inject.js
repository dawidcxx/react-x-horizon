import React, {Component} from 'react'
import flatten from 'lodash.flatten'

const inject = (...args) => WrappedComponent => {
  class InjectedComponent extends Component {
    constructor(props, context) {
      super(props, context)
      
      args = flatten(args)
      
      const {hz} = this.context
      
      this.collectionsToPropsMapper = args.slice(-1)[0] // we grab the mapper from the args (expected to be last arg)
      this.collectionNames = args.slice(0, args.length - 1) // we grab the collection names (all but last)
      this.collections = this.collectionNames.map(cn => hz(cn)) // we turn the collection names into real collections
      
      this.mappings = {} // the result of running the user provided function shall be stored here
      
      // some mappings will be observables
      // we subscribe to them and listen for any changes 
      this.observables = {} 
      
      // some will be `actions`
      this.actions = {}
      
      this.computeMappings(this.props) // basically run the user provided function
      this.computeObservablesAndActions()  // maps the user returned object into observables and actions
      
      // the user will want to watch some collection 
      // we provide initial state for those collections as empty lists
      this.state = Object.keys(this.observables).reduce((acc, key) => {
        return Object.assign({}, acc, { [key]: [] })
      }, {})
      
    }
    
    computeMappings(props) {
      // we run the user provided function (the last argument thing)
      this.mappings = this.collectionsToPropsMapper(...this.collections, props)
    }
    
    computeObservablesAndActions() {
      // turn mappings into observables
      // when the observable has some data for us we set the state with it 
            
      Object.keys(this.mappings).forEach(key => {
        let mapping = this.mappings[key]
        if(mapping.subscribe && typeof mapping.subscribe === 'function') { // observable
          this.observables[key] = mapping.subscribe(nextState => {
            this.setState({ [key]: nextState })
          })
        }
        if (typeof mapping === 'function') { // action
          this.actions[key] = mapping
        }
      })      
    }
    
    componentWillReceiveProps(nextProps) {
      this.unsubscribeFromCurrentObservables()
      this.computeMappings(nextProps)
      this.computeObservablesAndActions()
    }   
       
    componentWillUnmount() {
      this.unsubscribeFromCurrentObservables()
    }    
    
    unsubscribeFromCurrentObservables() {
      Object.keys(this.observables).forEach(k => this.observables[k].unsubscribe())
    }
       
    render() {
      return <WrappedComponent {...this.props} {...this.state} {...this.actions} />
    }
  }
  
  InjectedComponent.contextTypes = { hz: React.PropTypes.func.isRequired }
  
  return InjectedComponent
}

export default inject