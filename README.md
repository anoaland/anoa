# Anoa

Anoa React Native SDK

# Notice

This project is under development. Not ready for production yet.

# Installation

```
npm i anoa
```

# Usage

## Redux Store

### Build App Store

```ts
import { ReduxStore } from 'anoa'
import { reducers, RootActions, RootState } from './reducers'

export const AppStore = new ReduxStore<RootState, RootActions>(reducers)
```

### Init App Store

Initialize your redux store.

```ts
await AppStore.init({
  // redux initial state (optional)
  initialState: {
    todo: {
      foo: 'foo'
    }
  },
  // redux middleware before redux thunk middleware attached (optional)
  beforeMiddleware: [
    awesomeMiddleware,
    anotherMiddleware    
  ],
  // redux middleware before redux thunk middleware attached (optional)
  afterMiddleware: [
    logOrSomethingMiddleware
  ]
})
```

### App Store Provider

Wrap your main component with your store provider.

```tsx
<AppStore.Provider>
  <View style={styles.container}>
    <Text style={styles.welcome}>Welcome to React Native!</Text>
  </View>
</AppStore.Provider>
```

### App Store Class Decorator

Connect your component to store using `withStoreClass` class decorator.

```tsx
@AppStore.withStoreClass<StateProps, ActionProps>(
  state => ({
    foo: state.todo.foo,
    bar: state.todo.bar
  }),
  dispatch => ({
    addFoo: val => dispatch(addFooAction(val))
  })
)
export class Foo extends React.Component<FooProps, FooState> {
  constructor(props: FooProps) {
    super(props)
    this.state = {}
  }

  // ...
}
```

# License

MIT - see LICENSE
