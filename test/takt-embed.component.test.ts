import { Component } from '@angular/core'
import { TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { describe, it, expect, beforeEach } from 'vitest'
import { TaktEmbedComponent } from '../src/lib/takt-embed.component'

@Component({
  standalone: true,
  imports: [TaktEmbedComponent],
  template: `<takt-embed [domain]="domain" [theme]="theme" [title]="title" />`,
})
class HostComponent {
  domain = 'a.test'
  theme: 'light' | 'dark' | 'auto' = 'dark'
  title = 'Stats'
}

describe('<takt-embed>', () => {
  beforeEach(() => TestBed.resetTestingModule())

  function iframe() {
    const f = TestBed.createComponent(HostComponent)
    f.detectChanges()
    return f.debugElement.query(By.css('iframe')).nativeElement as HTMLIFrameElement
  }

  it('renders an <iframe> whose src reflects domain and theme', () => {
    const el = iframe()
    expect(el.getAttribute('src')).toBe('https://taktlytics.com/embed/a.test?theme=dark')
    expect(el.getAttribute('title')).toBe('Stats')
    expect(el.getAttribute('width')).toBe('404')
    expect(el.getAttribute('height')).toBe('264')
  })

  it('sets a privacy-preserving referrer policy on the iframe', () => {
    expect(iframe().getAttribute('referrerpolicy')).toBe('strict-origin-when-cross-origin')
  })

  it('throws (propagated from core) on an unsafe host instead of trusting a javascript: URL', () => {
    // Read the `src` getter directly: it calls core's `embedUrl`, which throws on
    // a non-http(s) host before any value can reach bypassSecurityTrustResourceUrl.
    // Going through detectChanges() would let zone.js swallow the throw asynchronously.
    const f = TestBed.createComponent(TaktEmbedComponent)
    f.componentInstance.domain = 'a.test'
    f.componentInstance.host = 'javascript:alert(1)'
    expect(() => f.componentInstance.src).toThrow()
  })
})
