import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { RouterModule } from "@angular/router";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from "@angular/material/form-field";
import { Router } from "@angular/router";
import { AuthService, Credential } from "../../../../core/services/auth.service";
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import locateEs_PR from './sign-in.component.locate.es-PR.json';
import locateEn_US from './sign-in.component.locate.en-US.json';
import { ComponentLocateFactory } from "../../../../common/translate/component-locate.factory";
import { ComponentLocate } from "../../../../common/translate/component-locate";
import { NgIf } from "@angular/common";
import { ButtonExternalsProvidersComponent } from "../components/button-externals-providers/button-externals-providers.component";

interface SignInForm {
  email: FormControl<string>;
  password: FormControl<string>;
}

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    RouterModule,
    NgIf,
    MatSnackBarModule,
    ButtonExternalsProvidersComponent
  ],
  providers: [
    ComponentLocateFactory.fromComponentName('app-sign-in')
      .withCulture('es-PR', locateEs_PR)
      .withCulture('en-US', locateEn_US).build()
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent {
  public locate: ComponentLocate = inject(ComponentLocate);
  public formBuilder: FormBuilder = inject(FormBuilder);

  private _authService = inject(AuthService);
  private _router = inject(Router);
  private _snackBar = inject(MatSnackBar);

  public errorSignIn: string = "";
  public hide = true;
  public form: FormGroup<SignInForm> = this.formBuilder.group({
    email: this.formBuilder.control('', {
      validators: [Validators.required, Validators.email],
      nonNullable: true,
    }),
    password: this.formBuilder.control('', {
      validators: Validators.required,
      nonNullable: true,
    }),
  });

  get isEmailValid(): string | boolean {
    const control = this.form.get('email');

    const isInvalid = control?.invalid && control.touched;

    if (isInvalid) {
      return control.hasError('required')
        ? this.locate.resources.form.errors.required
        : this.locate.resources.form.errors.invalidEmail;
    }

    return false;
  }

  async signIn(): Promise<void> {
    if (this.form.invalid) return;

    const credential: Credential = {
      email: this.form.value.email || '',
      password: this.form.value.password || '',
    };

    try {
      await this._authService.signInWithEmailAndPassword(credential);
      const snackBarRef = this.openSnackBar();

      snackBarRef.afterDismissed().subscribe(() => {
        this._router.navigateByUrl('/');
      });
    } catch (error: any) {
      console.error(error);
      this.errorSignIn = this.locate.resources.form.errors.defaultSingIn;

      if (error?.code === "auth/invalid-credential") {
        this.errorSignIn = this.locate.resources.form.errors.unauthorizedSignIn;
      }
    }
  }

  openSnackBar() {
    return this._snackBar.open('Succesfully Log in 😀', 'Close', {
      duration: 2500,
      verticalPosition: 'top',
      horizontalPosition: 'end',
    });
  }

  inputChange() {
    this.errorSignIn = "";
  }
}
