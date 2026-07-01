import { Component } from '@angular/core'
import { TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { describe, it, expect, beforeEach } from 'vitest'
import { TaktBadgeComponent } from '../src/lib/takt-badge.component'

@Component({
  standalone: true,
  imports: [TaktBadgeComponent],
  template: `<takt-badge [domain]="domain" [variant]="variant" [glyph]="glyph" />`,
})
class HostComponent {
  domain = 'a.test'
  variant: 'a' | 'b' | 'd' = 'd'
  glyph: 'dash' | 'off' = 'dash'
}

describe('<takt-badge>', () => {
  beforeEach(() => TestBed.resetTestingModule())

  function img() {
    const f = TestBed.createComponent(HostComponent)
    f.detectChanges()
    return f.debugElement.query(By.css('img')).nativeElement as HTMLImageElement
  }

  it('renders an <img> whose src reflects domain and options', () => {
    const el = img()
    expect(el.getAttribute('src')).toBe(
      'https://taktlytics.com/public/a.test/badge.svg?variant=d&glyph=dash',
    )
    expect(el.getAttribute('loading')).toBe('lazy')
  })
})
