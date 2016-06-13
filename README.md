# React × Horizon
Glue react and horizon together with this one simple trick!

# Installation

```
npm install --save react-x-horizon
```
Or just grab the react-x-horizon.umd.(min?).js from https://github.com/dawidczarnik/react-x-horizon/tree/master/lib 
and link it via the good ol script tag. If you do that the module will be avaible as ReactXHorizon. 


# API

### `<Provider>`

Wrap the scope of your real time application(usually the whole app) and provide it a Horizon instance. 

#### props: 

***hz*** - The horizon instance


### `inject([...collectionNames], mapColsToProps(...collections, ownProps))`

#### arguments: 
  
***collectionNames (array\<string\>)*** - The collection names to grab. Those will be transformed into collections and passed to your mapperFn.

***mapColsToProps (...collections, ownProps) → object*** - Transform the collections into props. Each key will be mapped to a prop, however if the key holds an observable, we will subscribe for you and inject the result and not then the observable itself.

