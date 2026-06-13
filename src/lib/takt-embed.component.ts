import { ChangeDetectionStrategy, Component, Input, inject } from '@angular/core'
import { DomSanitizer, type SafeResourceUrl } from '@angular/platform-browser'
import { embedUrl, type EmbedTheme, type WidgetLang } from '@vskstudio/takt-core'

/**
 * Thin `<iframe>` wrapper over the server-rendered embed page
 * (`/embed/{domain}`). `<takt-embed domain="..." theme="dark" />`. The src is
 * built by core's trusted URL builder, then marked safe for Angular.
 */
@Component({
  selector: 'takt-embed',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<iframe
    [src]="src"
    [title]="title"
    [width]="width"
    [height]="height"
    loading="lazy"
    style="border:0"
  ></iframe>`,
})
export class TaktEmbedComponent {
  private readonly sanitizer = inject(DomSanitizer)

  @Input({ required: true }) domain = ''
  @Input() theme?: EmbedTheme
  @Input() lang?: WidgetLang
  @Input() host?: string
  @Input() width = 404
  @Input() height = 264
  @Input() title = 'takt'

  get src(): SafeResourceUrl {
    const url = embedUrl(this.domain, { host: this.host, theme: this.theme, lang: this.lang })
    return this.sanitizer.bypassSecurityTrustResourceUrl(url)
  }
}
