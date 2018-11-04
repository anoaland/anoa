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

```ts
await AppStore.init()
```

### App Store Provider

```tsx
<AppStore.Provider>
  <View style={styles.container}>
    <Text style={styles.welcome}>Welcome to React Native!</Text>
  </View>
</AppStore.Provider>
```

### App Store Class Decorator

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
