import { PLATFORM_ID } from '@angular/core'
import { TestBed } from '@angular/core/testing'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { provideTakt } from '../src/lib/provide-takt'
import { TaktService } from '../src/lib/takt.service'

const createTakt = vi.fn()
vi.mock('@vskstudio/takt-core', () => ({ createTakt: (...a: unknown[]) => createTakt(...a) }))

function makeInstance() {
  return {
    track: vi.fn(),
    pageview: vi.fn(),
    enableSpa: vi.fn(() => vi.fn()),
    enableOutbound: vi.fn(() => vi.fn()),
    enableFiles: vi.fn(() => vi.fn()),
    optOut: vi.fn(),
    optIn: vi.fn(),
  }
}

describe('provideTakt', () => {
  beforeEach(() => {
    TestBed.resetTestingModule()
    createTakt.mockReset()
  })

  it('boots in the browser: creates instance, fires initial pageview, stores it', () => {
    const inst = makeInstance()
    createTakt.mockReturnValue(inst)

    TestBed.configureTestingModule({ providers: [provideTakt({ domain: 'x.test' })] })
    const svc = TestBed.inject(TaktService)

    expect(createTakt).toHaveBeenCalledOnce()
    expect(inst.pageview).toHaveBeenCalledOnce()
    expect(svc.instance).toBe(inst)
  })

  it('enables spa by default and only outbound/files when requested', () => {
    const inst = makeInstance()
    createTakt.mockReturnValue(inst)

    TestBed.configureTestingModule({ providers: [provideTakt({ outbound: true })] })
    TestBed.inject(TaktService)

    expect(inst.enableSpa).toHaveBeenCalledOnce()
    expect(inst.enableOutbound).toHaveBeenCalledOnce()
    expect(inst.enableFiles).not.toHaveBeenCalled()
  })

  it('passes a file-extension array through to enableFiles', () => {
    const inst = makeInstance()
    createTakt.mockReturnValue(inst)

    TestBed.configureTestingModule({ providers: [provideTakt({ files: ['pdf', 'zip'] })] })
    TestBed.inject(TaktService)

    expect(inst.enableFiles).toHaveBeenCalledWith(['pdf', 'zip'])
  })

  it('can disable spa', () => {
    const inst = makeInstance()
    createTakt.mockReturnValue(inst)

    TestBed.configureTestingModule({ providers: [provideTakt({ spa: false })] })
    TestBed.inject(TaktService)

    expect(inst.enableSpa).not.toHaveBeenCalled()
  })

  it('disposes autocapture and clears the instance on app destroy', () => {
    const inst = makeInstance()
    const disposeSpa = vi.fn()
    inst.enableSpa.mockReturnValue(disposeSpa)
    createTakt.mockReturnValue(inst)

    TestBed.configureTestingModule({ providers: [provideTakt()] })
    const svc = TestBed.inject(TaktService)
    expect(svc.instance).toBe(inst)

    TestBed.resetTestingModule() // tears down the environment injector

    expect(disposeSpa).toHaveBeenCalledOnce()
    expect(svc.instance).not.toBe(inst)
  })

  it('forwards privacy config to createTakt', () => {
    const inst = makeInstance()
    createTakt.mockReturnValue(inst)

    TestBed.configureTestingModule({
      providers: [provideTakt({ endpoint: '/ingest', respectDnt: false, excludeLocalhost: false })],
    })
    TestBed.inject(TaktService)

    expect(createTakt).toHaveBeenCalledWith(
      expect.objectContaining({ endpoint: '/ingest', respectDnt: false, excludeLocalhost: false }),
    )
  })

  it('exposes optOut/optIn through the booted instance', () => {
    const inst = makeInstance()
    createTakt.mockReturnValue(inst)

    TestBed.configureTestingModule({ providers: [provideTakt()] })
    const svc = TestBed.inject(TaktService)
    svc.optOut()
    svc.optIn()

    expect(inst.optOut).toHaveBeenCalledOnce()
    expect(inst.optIn).toHaveBeenCalledOnce()
  })

  it('does NOT boot on the server', () => {
    TestBed.configureTestingModule({
      providers: [{ provide: PLATFORM_ID, useValue: 'server' }, provideTakt()],
    })
    TestBed.inject(TaktService)

    expect(createTakt).not.toHaveBeenCalled()
  })
})
