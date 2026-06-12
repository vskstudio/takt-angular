import { InjectionToken } from '@angular/core'
import type { TaktConfig } from './types'

/** Holds the {@link TaktConfig} passed to {@link provideTakt}. */
export const TAKT_CONFIG = new InjectionToken<TaktConfig>('takt.config')
