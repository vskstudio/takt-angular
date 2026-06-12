import type { TaktInstance } from './types'

let _noop: TaktInstance | null = null
let _warned = false

export function noopTakt(): TaktInstance {
  if (_noop) return _noop
  const warnOnce = (): void => {
    if (_warned) return
    _warned = true
    console.warn('[takt] TaktService used before provideTakt() booted (or on the server) — returning a no-op instance.')
  }
  const noDispose = (): (() => void) => () => {}
  _noop = {
    track: () => warnOnce(),
    pageview: () => warnOnce(),
    enableSpa: noDispose,
    enableOutbound: noDispose,
    enableFiles: noDispose,
    optOut: () => {},
    optIn: () => {},
  }
  return _noop
}
