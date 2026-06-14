import { ChangeDetectionStrategy, Component, Input } from '@angular/core'
import { badgeUrl, type BadgeGlyph, type BadgeVariant, type WidgetLang } from '@vskstudio/takt-core'

/**
 * Thin `<img>` wrapper over the server-rendered badge SVG
 * (`/public/{domain}/badge.svg`). `<takt-badge domain="..." variant="d" />`.
 */
@Component({
  selector: 'takt-badge',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<img [src]="src" [alt]="alt" loading="lazy" decoding="async" />`,
})
export class TaktBadgeComponent {
  @Input({ required: true }) domain = ''
  @Input() variant?: BadgeVariant
  @Input() glyph?: BadgeGlyph
  @Input() lang?: WidgetLang
  @Input() host?: string
  @Input() alt = 'takt'

  get src(): string {
    return badgeUrl(this.domain, {
      host: this.host,
      variant: this.variant,
      glyph: this.glyph,
      lang: this.lang,
    })
  }
}
