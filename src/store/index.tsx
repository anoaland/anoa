import React from 'react'
import {
  connect,
  MapDispatchToPropsParam,
  MapStateToPropsParam,
  Provider,
  InferableComponentEnhancerWithProps
} from 'react-redux'
import {
  Action,
  applyMiddleware,
  createStore,
  Middleware,
  Reducer,
  Store,
  StoreEnhancer
} from 'redux'
import thunk, { ThunkDispatch } from 'redux-thunk'

/**
 * Redux store class builder.
 */
export class ReduxStore<
  TState,
  TAction extends Action,
  ThunkDispatchFn = ThunkDispatch<TState, undefined, TAction>
> {
  reducer!: Reducer<TState, TAction>
  store!: Store<TState & {}, TAction> & { dispatch: {} }

  constructor(reducer: Reducer<TState, TAction>) {
    this.reducer = reducer
  }

  /**
   * Initialze app store. Call this once before render Store.Provider.
   * @param getInitialState Async function to to get the initial app state.
   * @param beforeMiddleware Redux Middleware before thunk middleware get called.
   * @param afterMiddleware Redux middleware after thunk middleware get called.
   */
  async init(
    getInitialState?: () => Promise<Partial<TState>>,
    beforeMiddleware?: Middleware,
    afterMiddleware?: Middleware
  ) {
    const initialState: Partial<TState> = getInitialState
      ? await getInitialState()
      : {}

    let middleware: StoreEnhancer
    if (beforeMiddleware && afterMiddleware) {
      middleware = applyMiddleware(beforeMiddleware, thunk, afterMiddleware)
    } else if (beforeMiddleware) {
      middleware = applyMiddleware(beforeMiddleware, thunk)
    } else if (afterMiddleware) {
      middleware = applyMiddleware(thunk, afterMiddleware)
    } else {
      middleware = applyMiddleware(thunk)
    }

    this.store = createStore(this.reducer, initialState as any, middleware)
  }

  /**
   * Store provider that wraps your root application.
   */
  Provider: React.SFC = ({ children }) => (
    <Provider store={this.store}>{children}</Provider>
  )

  /**
   * Store HOC.
   * @param mapStateToProps Map local state to store state
   * @param mapDispatchToProps Map local action to store action
   */
  withStore<TStateProps = {}, TDispatchProps = {}, TOwnProps = {}>(
    mapStateToProps?: MapStateToPropsParam<TStateProps, TOwnProps, TState>,
    mapDispatchToProps?: (
      dispatch: ThunkDispatchFn,
      ownProps: TOwnProps
    ) => MapDispatchToPropsParam<TDispatchProps, TOwnProps>
  ): InferableComponentEnhancerWithProps<
    TStateProps & TDispatchProps,
    TOwnProps
  > {
    return connect(
      mapStateToProps,
      mapDispatchToProps as any
    )
  }

  /**
   * Store class decorator.
   * @param mapStateToProps Map local state to store state
   * @param mapDispatchToProps Map local action to store action
   */
  withStoreClass<TStateProps = {}, TDispatchProps = {}, TOwnProps = {}>(
    mapStateToProps?: MapStateToPropsParam<TStateProps, TOwnProps, TState>,
    mapDispatchToProps?: (
      dispatch: ThunkDispatchFn,
      ownProps: TOwnProps
    ) => MapDispatchToPropsParam<TDispatchProps, TOwnProps>
  ): ClassDecorator {
    return (target: any) =>
      this.withStore(mapStateToProps, mapDispatchToProps as any)(target) as any
  }
}
