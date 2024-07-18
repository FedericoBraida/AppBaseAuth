import { EventEmitter } from "@angular/core";
import { CultureKeys, formatDate } from "../../app/shared/@constants/global-constants";

export class ComponentLocate {
    /**************************************
     *  Properties and fields
     ***********************************************/
    protected languagesStorage: any = {};

    public resources: any = {};
    public culture: CultureKeys = "es-PR";
    public dateFormat: string | undefined;
    public routeLanguage: string | undefined;
    public onChangedResource: EventEmitter<any> = new EventEmitter<any>();

    /**************************************
     *  Properties and fields
     ***********************************************/
    public setLanguage(culture: CultureKeys, languageStorage: any) {
        this.culture = culture;
        this.languagesStorage[culture] = languageStorage;
        this.dateFormat = formatDate[culture];
    }

    public changeLanguage(culture: CultureKeys, defaultCulture: string) {
        this.resources = this.languagesStorage[culture] || this.languagesStorage[defaultCulture];
        this.culture = culture;
        this.dateFormat = formatDate[culture];
        this.onChangedResource.next(culture);
    }

    public getDateFormat(): string {
        return formatDate[this.culture];
    }
}