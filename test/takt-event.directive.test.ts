import { Component } from '@angular/core'
import { TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { TaktEventDirective } from '../src/lib/takt-event.directive'
import { TaktService } from '../src/lib/takt.service'

@Component({
  standalone: true,
  imports: [TaktEventDirective],
  template: `
    <button id="plain" taktEvent="Signup">go</button>
    <button id="rich" taktEvent="Buy" [taktProps]="props" [taktRevenue]="rev">buy</button>
    <button id="empty" taktEvent="">noop</button>
  `,
})
class HostComponent {
  props = { plan: 'pro' }
  rev = { amount: '29.00', currency: 'EUR' }
}

describe('[taktEvent] directive', () => {
  let track: ReturnType<typeof vi.fn>

  beforeEach(() => {
    TestBed.resetTestingModule()
    track = vi.fn()
    const svc = TestBed.inject(TaktService)
    svc._setInstance({ track } as never)
  })

  function fixture() {
    const f = TestBed.createComponent(HostComponent)
    f.detectChanges()
    return f
  }

  function click(f: ReturnType<typeof fixture>, id: string) {
    f.debugElement.query(By.css(`#${id}`)).nativeElement.click()
  }

  it('tracks the event name on click', () => {
    const f = fixture()
    click(f, 'plain')
    expect(track).toHaveBeenCalledWith('Signup', undefined)
  })

  it('forwards props and revenue', () => {
    const f = fixture()
    click(f, 'rich')
    expect(track).toHaveBeenCalledWith('Buy', {
      props: { plan: 'pro' },
      revenue: { amount: '29.00', currency: 'EUR' },
    })
  })

  it('resolves the instance at click time (not bind time)', () => {
    const f = fixture()
    const later = vi.fn()
    TestBed.inject(TaktService)._setInstance({ track: later } as never)
    click(f, 'plain')
    expect(track).not.toHaveBeenCalled()
    expect(later).toHaveBeenCalledWith('Signup', undefined)
  })

  it('sends revenue alone when no props are bound', () => {
    @Component({
      standalone: true,
      imports: [TaktEventDirective],
      template: `<button id="rev" taktEvent="Buy" [taktRevenue]="rev">buy</button>`,
    })
    class RevHost {
      rev = { amount: '9.99', currency: 'USD' }
    }
    const f = TestBed.createComponent(RevHost)
    f.detectChanges()
    f.debugElement.query(By.css('#rev')).nativeElement.click()
    expect(track).toHaveBeenCalledWith('Buy', { revenue: { amount: '9.99', currency: 'USD' } })
  })

  it('does nothing with an empty event name', () => {
    const f = fixture()
    click(f, 'empty')
    expect(track).not.toHaveBeenCalled()
  })
})
