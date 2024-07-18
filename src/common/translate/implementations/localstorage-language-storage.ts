import { Injectable } from '@angular/core';
import { LanguageStorageBase } from '../behaviors/language-storage-base';
import { Observable } from 'rxjs';
import { CultureKeys } from "../../../app/shared/@constants/global-constants";


@Injectable({ providedIn: 'root' })
export class LocalStorageLenguageStorage implements LanguageStorageBase {



    /************************************
    * @ CONST
    ****************************************************************/
    public static LanguageStorageKey: string = "x-language_selected";


    /************************************
    * @ Imeplements ILanguageStorage
    ****************************************************************/

    set(culture: CultureKeys): Observable<any> {
        var observable: Observable<string> = new Observable<string>((obs) => {
            if (window.localStorage) {
                window.localStorage.setItem(LocalStorageLenguageStorage.LanguageStorageKey, culture);
                obs.next();
            } else {
                console.error("The browser not support localstorage");
                obs.error("The browser not support localstorage");
            }
        });

        return observable;
    }

    get(): Observable<CultureKeys> {
        var observable: Observable<CultureKeys> = new Observable<CultureKeys>((obs) => {
            if (window.localStorage) {
                var culture: CultureKeys = window.localStorage.getItem(LocalStorageLenguageStorage.LanguageStorageKey) as CultureKeys;
                obs.next(culture);
            } else {
                console.error("The browser not support localstorage");
                obs.error("The browser not support localstorage");
            }
        });

        return observable;
    }

    setSynchronous(culture: string): void {
        if (window.localStorage) {
            window.localStorage.setItem(LocalStorageLenguageStorage.LanguageStorageKey, culture);

        } else {
            console.error("The browser not support localstorage");
        }
    }

    getSynchronous(): CultureKeys {
        var culture: CultureKeys = "es-PR";

        if (window.localStorage) {
            culture = window.localStorage.getItem(LocalStorageLenguageStorage.LanguageStorageKey) as CultureKeys;

        } else {
            console.error("The browser not support localstorage");
        }
        
        return culture;
    }


}