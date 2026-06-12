import { Component } from '@angular/core'
import { TaktEventDirective } from '@vskstudio/takt-angular'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TaktEventDirective],
  template: `
    <button id="signup" taktEvent="Signup" [taktProps]="{ plan: 'pro' }">Sign up</button>
    <a id="nav" href="/about" (click)="nav($event)">About</a>
  `,
})
export class AppComponent {
  nav(event: Event): void {
    event.preventDefault()
    history.pushState({}, '', '/about')
  }
}
