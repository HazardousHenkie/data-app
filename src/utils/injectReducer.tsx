import * as React from 'react'
import hoistNonReactStatics from 'hoist-non-react-statics'
import { useStore, ReactReduxContext } from 'react-redux'

import { getInjectors } from './reducerInjectors'
import { InjectReducerParams, InjectedStore } from 'types'

export default function hocWithReducer<P>({
  key,
  reducer
}: InjectReducerParams) {
  function wrap(
    WrappedComponent: React.ComponentType<P>
  ): React.ComponentType<P> {
    class ReducerInjector extends React.Component<P> {
      public static contextType = ReactReduxContext
      public static WrappedComponent = WrappedComponent
      public static displayName = `withReducer(${WrappedComponent.displayName ||
        WrappedComponent.name ||
        'Component'})`

      constructor(props: any, context: any) {
        super(props, context)

        getInjectors(context.store).injectReducer(key, reducer)
      }

      public render() {
        return <WrappedComponent {...this.props} />
      }
    }

    return hoistNonReactStatics(ReducerInjector, WrappedComponent) as any
  }
  return wrap
}

const useInjectReducer = ({ key, reducer }: InjectReducerParams) => {
  const store = useStore() as InjectedStore
  React.useEffect(() => {
    getInjectors(store).injectReducer(key, reducer)
  }, [key, reducer, store])
}

export { useInjectReducer }
