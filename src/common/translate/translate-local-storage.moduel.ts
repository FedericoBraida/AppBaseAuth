import { NgModule } from '@angular/core';
import { LanguageStorageBase } from './behaviors/language-storage-base';
import { LocalStorageLenguageStorage } from './implementations/localstorage-language-storage';
import { TranslateServices } from './services/translate.services';
import { TranslateInitializer } from './translate.initializer';


@NgModule({
    providers: [
        TranslateServices,
        {
            provide: LanguageStorageBase,
            useClass: LocalStorageLenguageStorage
        },
        TranslateInitializer
    ],
})
export class TranslateLocalStorageModuel { }