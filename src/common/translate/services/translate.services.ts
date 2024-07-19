import { DOCUMENT } from '@angular/common';
import { EventEmitter, Inject, Injectable } from '@angular/core';
import { LanguageStorageBase } from '../behaviors/language-storage-base';
import { ComponentLocate } from '../component-locate';
import { Observable } from 'rxjs';
import { CultureKeys } from "../../../app/shared/@constants/global-constants";


export interface ComponentLocateStorage {
    [name: string]: ComponentLocate
}

export class ComponentLocateBuildArgumentLanguage {
    public culture: CultureKeys = 'es-PR';
    public source: any;
}

export class ComponentLocateBuildArgument {
    public componentName: string = '';
    public langueges: Array<ComponentLocateBuildArgumentLanguage> = [];
}

export class OnChangeCultureEventArgs {
    public oldCulture: CultureKeys = 'es-PR';
    public culture: CultureKeys = 'es-PR';
}


@Injectable({ providedIn: "root" })
export class TranslateServices {
    /***********************************************
    * @ Const
    ***********************************************/
    public static DefaultCultureName: CultureKeys = 'es-PR';

    /***********************************************
    * @ Properties and fields
    ***********************************************/
    private _components: ComponentLocateStorage = {};
    private _culture: CultureKeys = 'es-PR';

    public get culture(): string { return this._culture; }

    public readonly onCultureChange: EventEmitter<OnChangeCultureEventArgs> = new EventEmitter<OnChangeCultureEventArgs>();
    public routeLanguage: string | undefined;

    /***********************************************
     * @ Builders
     ***********************************************/
    constructor(private _langaugeStorage: LanguageStorageBase, @Inject(DOCUMENT) private document: Document) {
    }

    /***********************************************
     * @ Public methods
     ***********************************************/
    public initializationService(): Observable<string> {
        var observer: Observable<string> = new Observable<string>((obs) => {
            this._langaugeStorage.get().subscribe((culture) => {
                if (culture) {
                    this._culture = culture;
                } else {
                    this._culture = TranslateServices.DefaultCultureName;
                }
                obs.next(this._culture);
                this.document.documentElement.lang = this._culture;
            })
        });

        return observer;
    }

    public fromComponent(args: ComponentLocateBuildArgument): ComponentLocate {
        if (typeof this._components[args.componentName] === "undefined") {
            this._components[args.componentName] = new ComponentLocate();
            args.langueges.forEach((l) => {
                this._components[args.componentName].setLanguage(l.culture, l.source);
            });
            this._components[args.componentName].routeLanguage = this.routeLanguage;
            this._components[args.componentName].changeLanguage(this._culture, TranslateServices.DefaultCultureName);
        }
        return this._components[args.componentName];
    }

    public fromLocateInstance(args: ComponentLocateBuildArgument, translate: ComponentLocate): ComponentLocate {
        if (typeof this._components[args.componentName] === "undefined") {
            this._components[args.componentName] = translate;
            args.langueges.forEach((l) => {
                this._components[args.componentName].setLanguage(l.culture, l.source);
            });
            this._components[args.componentName].changeLanguage(this._culture, TranslateServices.DefaultCultureName);
        }
        return this._components[args.componentName];
    }

    public changeLanguage(culture: CultureKeys) {
        var observable: Observable<string> = new Observable<string>((obs) => {
            this._langaugeStorage.set(culture).subscribe(() => {
                var eventsArgs: OnChangeCultureEventArgs = {
                    culture: culture,
                    oldCulture: this._culture
                };
                this._culture = culture;

                Object.getOwnPropertyNames(this._components)
                    .forEach((x) => {
                        var component = (<ComponentLocate>this._components[x]);
                        component.routeLanguage = this.routeLanguage;
                        component.changeLanguage(culture, TranslateServices.DefaultCultureName);
                    });

                obs.next(culture);
                this.onCultureChange.emit(eventsArgs);
            });
        });

        return observable;
    }

    public getCurrentLanguage(): string {
        return this._culture;
    }

}