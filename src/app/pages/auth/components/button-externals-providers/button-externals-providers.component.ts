import { Component, inject, Input } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "../../../../../core/services/auth.service";
import { ComponentLocateFactory } from "../../../../../common/translate/component-locate.factory";
import locateEs_PR from './button-externals-providers.component.locate.es-PR.json';
import locateEn_US from './button-externals-providers.component.locate.en-US.json';
import { ComponentLocate } from "../../../../../common/translate/component-locate";

export enum Providers {
  GOOGLE = 'google',
}

export type ProvidersType = 'google';

@Component({
  selector: 'app-button-externals-providers',
  standalone: true,
  imports: [],
  providers: [
    ComponentLocateFactory.fromComponentName('app-button-externals-providers')
      .withCulture('es-PR', locateEs_PR)
      .withCulture('en-US', locateEn_US).build(),
  ],
  templateUrl: './button-externals-providers.component.html',
  styleUrl: './button-externals-providers.component.scss'
})
export class ButtonExternalsProvidersComponent {
  public locate: ComponentLocate = inject(ComponentLocate);

  @Input() isLogin = false;

  public providersEnum = Providers;

  private _authService = inject(AuthService);
  private _router = inject(Router);

  providerAction(provider: ProvidersType): void {
    if (provider === Providers.GOOGLE) {
      this.signUpWithGoogle();
    }
  }

  async signUpWithGoogle(): Promise<void> {
    try {
      await this._authService.signInWithGoogleProvider();
      this._router.navigateByUrl('/');
    } catch (error) {
      console.error(error);
    }
  }
}
