import { Observable } from 'rxjs';
import { CultureKeys } from "../../../app/shared/@constants/global-constants";


export abstract class LanguageStorageBase {
    abstract set(culture: CultureKeys): Observable<any>;
    abstract get(): Observable<CultureKeys>;

    abstract setSynchronous(culture: CultureKeys): void;
    abstract getSynchronous(): CultureKeys;
}