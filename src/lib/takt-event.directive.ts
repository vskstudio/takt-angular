import { Directive, HostListener, Input, inject } from '@angular/core'
import type { TrackOptions } from '@vskstudio/takt-core'
import { TaktService } from './takt.service'

type Revenue = NonNullable<TrackOptions['revenue']>
type Props = NonNullable<TrackOptions['props']>

/**
 * Declarative click tracking:
 * `<button taktEvent="Signup" [taktProps]="{plan:'pro'}">`. Resolves the live
 * instance at click time (no stale reference) and tracks through the service.
 */
@Directive({
  selector: '[taktEvent]',
  standalone: true,
})
export class TaktEventDirective {
  private readonly takt = inject(TaktService)

  /** The custom event name to track on click. */
  @Input('taktEvent') name = ''
  @Input() taktProps?: Props
  @Input() taktRevenue?: Revenue

  @HostListener('click')
  onClick(): void {
    if (!this.name) return
    const opts: TrackOptions = {}
    if (this.taktProps) opts.props = this.taktProps
    if (this.taktRevenue) opts.revenue = this.taktRevenue
    this.takt.track(this.name, Object.keys(opts).length ? opts : undefined)
  }
}
