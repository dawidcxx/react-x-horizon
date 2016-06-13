# React × Horizon
Glue react and horizon together with this one simple trick! 

This allows you to get rid of the ```componentDidMount()``` subscription boilerplate you would normally have and allows you to be a bit more expressive with your components. The API is inspired by redux's ```<Provider />``` and ```connect()``` (we call it ```inject()```) pattern. 

# Installation

```
npm install --save react-x-horizon
```
Or just grab the react-x-horizon.umd.(min?).js from https://github.com/dawidczarnik/react-x-horizon/tree/master/lib 
and link it via the good ol script tag. If you do that the module will be avaible as ReactXHorizon. 

# Example

```js

@inject(['todos'], todos => todos.watch()) 
class Todos extends Component {
  render() {
    return (
      <ul>
        {this.props.todos.map(t => <Todo key={t.id} {...t} />)} {
      </ul>
    )
  }
}

export default Todos

```
no decorators avabile? you can always just wrap like so

```js 
  export default inject(['todos'], todos => todos.watch())(Todos)
```

and you can use the component as usual, so for example 

```js

import Todos from './components/Todos'

const App = () => <div><Todos /></div>

```
Now we are not quite done yet, we need to wrap our app with the ```<Provider />``` component so our ```inject```'s have a Horizon connection. 

```js
import Horizon from '@horizon/client'

ReactDOM.render((
  <Provider hz={Horizon()}>
    <App />
  </Provider>
), document.getElementById('app'))
```
Voila! becasue you returned a observable by calling ```.watch()``` your ```<Todos />``` component will sync itself with your horizon backend. 



# API

### `<Provider>`

Wrap the scope of your real time application(usually the whole app) and provide it a Horizon instance. 

#### props: 

***hz*** - The horizon instance


### `inject([...collectionNames], mapColsToProps(...collections, ownProps))`

#### arguments: 
  
***collectionNames (array\<string\>)*** - The collection names to grab. Those will be transformed into collections and passed to your mapperFn.

***mapColsToProps (...collections, ownProps) → object*** - Transform the collections into props. Each key will be mapped to a prop, however if the key holds an observable, we will subscribe for you and inject the result and not the the observable itself.

