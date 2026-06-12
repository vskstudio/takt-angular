# @vskstudio/takt-angular

## 0.2.0

### Minor Changes

- Initial release. Idiomatic Angular wrapper for `@vskstudio/takt-core`:
  - `provideTakt(config)` — standalone `EnvironmentProviders` that boots Takt in the browser only, fires the initial pageview, enables spa/outbound/files autocapture, and disposes on app destroy.
  - `TaktService` — root-provided injectable (`track`, `pageview`, `optOut`, `optIn`, `instance`), a never-throwing no-op before init and on the server.
  - `TaktEventDirective` — `[taktEvent]` standalone directive for declarative click tracking with `[taktProps]` and `[taktRevenue]`.
  - `./element` — the framework-agnostic `<takt-analytics>` custom element with a self-contained CDN bundle.
