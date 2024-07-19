import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { firebaseProviders } from "./firebase.config";
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";
import { LanguageStorageBase } from "../common/translate/behaviors/language-storage-base";
import { LocalStorageLenguageStorage } from "../common/translate/implementations/localstorage-language-storage";
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from "@angular/material/form-field";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const NO_NG_MODULES = importProvidersFrom([BrowserAnimationsModule]);

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideAnimationsAsync(), 
    firebaseProviders,
    { 
      provide: LanguageStorageBase, 
      useClass: LocalStorageLenguageStorage 
    },
    NO_NG_MODULES,
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        appearance: 'outline',
        color: 'accent',
      },
    },
  ]
};
