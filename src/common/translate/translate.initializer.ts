import { APP_INITIALIZER, FactoryProvider } from '@angular/core';
import { TranslateServices } from './services/translate.services';

export const TranslateInitializer: FactoryProvider = {
    provide: APP_INITIALIZER,
    multi: true,
    useFactory: (traslateServices: TranslateServices) => {
        return (): Promise<any> => {
            var promise = new Promise<any>((resolve, reject) => {
                traslateServices.initializationService().subscribe({
                    next: () => {
                        resolve({});
                    },
                    error: () => {
                        reject();
                    }
                })
            })
            return promise;
        };
    },
    deps: [TranslateServices]
}