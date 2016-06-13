import React, {Component} from 'react'

class Provider extends Component {
  
  constructor(props, context) {
    super(props, context)
    this.state = {hz: this.props.hz}
  }
  
  getChildContext() {
    return {
      hz: this.state.hz
    }
  }
  
  render() {
    return React.Children.only(this.props.children)
  }
  
} 

Provider.childContextTypes = {hz: React.PropTypes.func.isRequired}


export default Provider