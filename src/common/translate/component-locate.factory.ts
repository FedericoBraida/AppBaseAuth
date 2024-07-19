import { FactoryProvider } from "@angular/core";
import { ComponentLocate } from "./component-locate";
import { ComponentLocateBuildArgumentLanguage, TranslateServices } from "./services/translate.services";
import locateEn from './common.locate.en-US.json';
import locateEs from './common.locate.es-PR.json';
import { CultureKeys } from "../../app/shared/@constants/global-constants";

export class ComponentLocateFactory {
    /***********************************************
     * @ Propertie and fields
     ***********************************************/
    protected _componentName: string;
    protected _culturesResouces: Array<ComponentLocateBuildArgumentLanguage> = [];

    /***********************************************
     * @ Builder
     ***********************************************/
    constructor(componentName: string) {
        this._componentName = componentName;
    }

    /***********************************************
     * Public Methods
     ***********************************************/
    public withCulture(culture: CultureKeys, resouces: any): any {
        this._culturesResouces.push({
            culture: culture,
            source: resouces
        });

        return this;
    }

    public build(): FactoryProvider {
        this._culturesResouces.forEach(culture => {
            if (culture.culture == 'en-US') {
                culture.source = { ...culture.source, ...locateEn };
            }
            if (culture.culture == 'es-PR') {
                culture.source = { ...culture.source, ...locateEs };
            }
        });

        return {
            provide: ComponentLocate,
            multi: false,
            useFactory: (traslateServices: TranslateServices) => {
                var locate = traslateServices.fromComponent({
                    componentName: this._componentName,
                    langueges: this._culturesResouces
                });
                return locate;
            },
            deps: [TranslateServices]
        }
    }

    /***********************************************
     * Static Members
     ***********************************************/
    public static fromComponentName(componentName: string) {
        return new ComponentLocateFactory(componentName);
    }
}