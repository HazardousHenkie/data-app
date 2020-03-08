import conformsTo from 'lodash/conformsTo'
import invariant from 'invariant'
import isEmpty from 'lodash/isEmpty'
import isFunction from 'lodash/isFunction'
import isString from 'lodash/isString'

import checkStore from './checkStore'
import { DAEMON, ONCE_TILL_UNMOUNT, RESTART_ON_REMOUNT } from './constants'
import { InjectedStore } from 'types'
import React from 'react'

const allowedModes = [RESTART_ON_REMOUNT, DAEMON, ONCE_TILL_UNMOUNT]

const checkKey = (key: string) =>
  invariant(
    isString(key) && !isEmpty(key),
    '(app/utils...) injectSaga: Expected `key` to be a non empty string'
  )

interface SagaDescriptor {
  saga?: () => IterableIterator<any>
  mode?: string | undefined
}
const checkDescriptor = (descriptor: SagaDescriptor) => {
  const shape = {
    saga: isFunction,
    mode: (mode: SagaDescriptor['mode']) =>
      isString(mode) && allowedModes.includes(mode!)
  }
  invariant(
    conformsTo(descriptor, shape),
    '(app/utils...) injectSaga: Expected a valid saga descriptor'
  )
}

export function injectSagaFactory(
  store: InjectedStore,
  isValid: boolean = false
) {
  return function injectSaga(
    key: string,
    descriptor: SagaDescriptor = {},
    args?: React.ComponentProps<any>
  ) {
    if (!isValid) {
      checkStore(store)
    }

    const newDescriptor = {
      ...descriptor,
      mode: descriptor.mode || DAEMON
    }
    const { saga, mode } = newDescriptor

    checkKey(key)
    checkDescriptor(newDescriptor)

    let hasSaga = Reflect.has(store.injectedSagas, key)

    if (process.env.NODE_ENV !== 'production') {
      const oldDescriptor = store.injectedSagas[key]
      if (hasSaga && oldDescriptor.saga !== saga) {
        oldDescriptor.task.cancel()
        hasSaga = false
      }
    }

    if (
      !hasSaga ||
      (hasSaga && mode !== DAEMON && mode !== ONCE_TILL_UNMOUNT)
    ) {
      store.injectedSagas[key] = {
        ...newDescriptor,
        task: store.runSaga(saga!, args)
      }
    }
  }
}

export function ejectSagaFactory(
  store: InjectedStore,
  isValid: boolean = false
) {
  return function ejectSaga(key: string) {
    if (!isValid) {
      checkStore(store)
    }

    checkKey(key)

    if (Reflect.has(store.injectedSagas, key)) {
      const descriptor = store.injectedSagas[key]
      if (descriptor.mode && descriptor.mode !== DAEMON) {
        descriptor.task.cancel()
        if (process.env.NODE_ENV === 'production') {
          store.injectedSagas[key] = 'done'
        }
      }
    }
  }
}

export function getInjectors(store: InjectedStore) {
  checkStore(store)

  return {
    injectSaga: injectSagaFactory(store, true),
    ejectSaga: ejectSagaFactory(store, true)
  }
}
