import '@angular/compiler'
import 'zone.js'
import { bootstrapApplication } from '@angular/platform-browser'
import { provideTakt } from '@vskstudio/takt-angular'
import { AppComponent } from './app.component'

bootstrapApplication(AppComponent, {
  providers: [
    // excludeLocalhost must be off or core suppresses every event under the test server.
    provideTakt({ domain: 'example.com', endpoint: '/api/event', excludeLocalhost: false }),
  ],
})
