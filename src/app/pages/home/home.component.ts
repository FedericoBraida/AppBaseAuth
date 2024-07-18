import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar'
import { ComponentLocateFactory } from "../../../common/translate/component-locate.factory";
import locateEs_PR from './home.component.locate.es-PR.json';
import locateEn_US from './home.component.locate.en-US.json';
import { ComponentLocate } from "../../../common/translate/component-locate";
import { TranslateServices } from "../../../common/translate/services/translate.services";
import { CultureKeys } from "../../shared/@constants/global-constants";
import { Router } from "@angular/router";
import { AuthService } from "../../../core/services/auth.service";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatButtonModule, MatToolbarModule],
  providers: [
    ComponentLocateFactory.fromComponentName('app-home')
      .withCulture('es-PR', locateEs_PR)
      .withCulture('en-US', locateEn_US).build(),
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export default class HomeComponent {
  public locate: ComponentLocate = inject(ComponentLocate);

  private traslateSerivce: TranslateServices = inject(TranslateServices);
  private _router = inject(Router);
  private _authservice = inject(AuthService);

  public async logOut() {
    try {
      await this._authservice.logOut();
      this._router.navigateByUrl('/auth/sign-in');
    } catch (error) {
      console.error(error);
    }
  }

  public onLanguageSelected(culture: CultureKeys) {
    this.traslateSerivce.changeLanguage(culture).subscribe({
        next: (result) => {
        },
    });
}
}
