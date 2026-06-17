import type { createTakt } from '@vskstudio/takt-core'

// Public structural surface of core's Analytics. Picking the public methods
// drops the class's private members, which otherwise make the emitted .d.ts
// for token/service values invalid (TS4094).
export type TaktInstance = Pick<
  ReturnType<typeof createTakt>,
  'track' | 'pageview' | 'enableSpa' | 'enableOutbound' | 'enableFiles' | 'optOut' | 'optIn'
>

/** Configuration for {@link provideTakt}. Mirrors the React wrapper's props. */
export interface TaktConfig {
  /** Site identifier sent with every event. Defaults to `location.hostname`. */
  domain?: string
  /** Ingestion endpoint. Defaults to `/api/event`. */
  endpoint?: string
  /**
   * First-party origin to derive the endpoint from (`{origin}/api/event`) —
   * your Takt domain or a custom domain to dodge ad-blockers
   * (`endpoint` wins over it).
   */
  scriptOrigin?: string
  /** Auto-track outbound link clicks. */
  outbound?: boolean
  /** Auto-track file downloads. Pass an array to restrict to those extensions. */
  files?: boolean | string[]
  /** Track SPA navigations (history pushState/replaceState + popstate). */
  spa?: boolean
  /** Suppress events when the browser's Do Not Track is enabled. */
  respectDnt?: boolean
  /** Suppress events on localhost and private IP ranges. */
  excludeLocalhost?: boolean
}
