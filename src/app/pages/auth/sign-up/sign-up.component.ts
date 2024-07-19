import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { Router, RouterModule } from "@angular/router";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldModule } from "@angular/material/form-field";
import { FormGroupHelper } from "../../../../common/helpers/form-group.helper";
import locateEs_PR from './sign-up.component.locate.es-PR.json';
import locateEn_US from './sign-up.component.locate.en-US.json';
import { ComponentLocateFactory } from "../../../../common/translate/component-locate.factory";
import { ComponentLocate } from "../../../../common/translate/component-locate";
import { AuthService, Credential } from "../../../../core/services/auth.service";
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar";
import { NgIf } from "@angular/common";
import { ButtonExternalsProvidersComponent } from "../components/button-externals-providers/button-externals-providers.component";

interface SignUpForm {
  names: FormControl<string>;
  lastName: FormControl<string>;
  email: FormControl<string>;
  password: FormControl<string>;
  // confirmPassword: FormControl<string>;
}

@Component({
  selector: 'app-sign-up',
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
    ButtonExternalsProvidersComponent,
  ],
  providers: [
    ComponentLocateFactory.fromComponentName('app-sign-up')
      .withCulture('es-PR', locateEs_PR)
      .withCulture('en-US', locateEn_US).build()
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent {
  public locate: ComponentLocate = inject(ComponentLocate);
  public formBuilder: FormBuilder = inject(FormBuilder);
  private _authService: AuthService = inject(AuthService);
  private _router: Router = inject(Router);
  private _snackBar: MatSnackBar = inject(MatSnackBar);

  public hide: boolean = true;

  public form: FormGroup<SignUpForm> = this.formBuilder.group({
    names: this.formBuilder.control('', {
      validators: Validators.required,
      nonNullable: true,
    }),
    lastName: this.formBuilder.control('', {
      validators: Validators.required,
      nonNullable: true,
    }),
    email: this.formBuilder.control('', {
      validators: [Validators.required, Validators.email],
      nonNullable: true,
    }),
    password: this.formBuilder.control('', {
      validators: Validators.required,
      nonNullable: true,
    }),
    // confirmPassword: this.formBuilder.control('', {
    //   validators: Validators.required,
    //   nonNullable: true,
    // }),
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

  async signUp(): Promise<void> {
    if (this.form.invalid) {
      FormGroupHelper.markAsDirty(this.form);
      return;
    };

    const credential: Credential = {
      email: this.form.value.email || '',
      password: this.form.value.password || '',
    };

    try {
      await this._authService.signUpWithEmailAndPassword(credential);

      const snackBarRef = this.openSnackBar();

      snackBarRef.afterDismissed().subscribe(() => {
        this._router.navigateByUrl('/');
      });
    } catch (error) {
      console.error(error);
    }
  }

  openSnackBar() {
    return this._snackBar.open('Succesfully Sign up 😀', 'Close', {
      duration: 2500,
      verticalPosition: 'top',
      horizontalPosition: 'end',
    });
  }
}
