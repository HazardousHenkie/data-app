import 'jest-localstorage-mock'
import '@testing-library/jest-dom/extend-expect'
import MutationObserver from '@sheerun/mutationobserver-shim'

// need it for lazy loading testing
window.MutationObserver = MutationObserver
