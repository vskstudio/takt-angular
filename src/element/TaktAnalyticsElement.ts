import { createTakt } from '@vskstudio/takt-core'

// Privacy attrs are default-on: only an explicit "false"/"0" disables them, so
// an absent attribute keeps the core default. Presence flags (outbound/files)
// are on when the attribute exists at all.
const truthy = (v: string | null): boolean => v !== 'false' && v !== '0'

// Built lazily: referencing HTMLElement at module load throws under SSR (Node),
// so the class is created only when registration runs in a DOM environment.
export function createTaktAnalyticsElement(): CustomElementConstructor {
  return class TaktAnalyticsElement extends HTMLElement {
    private disposers: Array<() => void> = []

    connectedCallback(): void {
      const attr = (name: string): string | null => this.getAttribute(name)
      const takt = createTakt({
        domain: attr('domain') ?? undefined,
        endpoint: attr('endpoint') ?? undefined,
        respectDnt: truthy(attr('respect-dnt')),
        excludeLocalhost: truthy(attr('exclude-localhost')),
      })
      if (truthy(attr('spa'))) this.disposers.push(takt.enableSpa())
      if (this.hasAttribute('outbound')) this.disposers.push(takt.enableOutbound())
      if (this.hasAttribute('files')) this.disposers.push(takt.enableFiles())
      takt.pageview()
    }

    disconnectedCallback(): void {
      this.disposers.forEach((dispose) => dispose())
      this.disposers = []
    }
  }
}
