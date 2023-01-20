import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import { defineCustomElements } from '@stripe-elements/stripe-elements/loader';
import {defineCustomElements as Alias} from '@ionic/pwa-elements/loader'
if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .then(() => defineCustomElements(window))
  .catch(err => console.log(err));

  Alias(window);
