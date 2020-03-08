import * as React from 'react'
import hoistNonReactStatics from 'hoist-non-react-statics'
import { useStore } from 'react-redux'

import { getInjectors } from './sagaInjectors'
import { InjectSagaParams, InjectedStore } from 'types'

export default function hocWithSaga<P>({ key, saga, mode }: InjectSagaParams) {
  function wrap(
    WrappedComponent: React.ComponentType<P>
  ): React.ComponentType<P> {
    class InjectSaga extends React.Component<P> {
      public static WrappedComponent = WrappedComponent
      public injectors: ReturnType<typeof getInjectors>

      public static displayName = `withSaga(${WrappedComponent.displayName ||
        WrappedComponent.name ||
        'Component'})`

      constructor(props: any, context: any) {
        super(props, context)

        this.injectors = getInjectors(context.store)

        this.injectors.injectSaga(key, { saga, mode }, this.props)
      }

      public componentWillUnmount() {
        this.injectors.ejectSaga(key)
      }

      public render() {
        return <WrappedComponent {...this.props} />
      }
    }

    return hoistNonReactStatics(InjectSaga, WrappedComponent) as any
  }
  return wrap
}

const useInjectSaga = ({ key, saga, mode }: InjectSagaParams) => {
  const store = useStore() as InjectedStore
  React.useEffect(() => {
    const injectors = getInjectors(store)
    injectors.injectSaga(key, { saga, mode })

    return () => {
      injectors.ejectSaga(key)
    }
  }, [key, mode, saga, store])
}

export { useInjectSaga }
