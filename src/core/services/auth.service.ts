import { Injectable, inject } from '@angular/core';
import {
  Auth,
  AuthProvider,
  GithubAuthProvider,
  GoogleAuthProvider,
  UserCredential,
  authState,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
} from '@angular/fire/auth';

export interface Credential {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _auth: Auth = inject(Auth);

  readonly authState$ = authState(this._auth);

  signUpWithEmailAndPassword(credential: Credential): Promise<UserCredential> {
    return createUserWithEmailAndPassword(
      this._auth,
      credential.email,
      credential.password
    );
  }

  signInWithEmailAndPassword(credential: Credential) {
    return signInWithEmailAndPassword(
      this._auth,
      credential.email,
      credential.password
    );
  }

  logOut(): Promise<void> {
    return this._auth.signOut();
  }

  signInWithGoogleProvider(): Promise<UserCredential> {
    const provider = new GoogleAuthProvider();

    return this.callPopUp(provider);
  }

  async callPopUp(provider: AuthProvider): Promise<UserCredential> {
    try {
      const result = await signInWithPopup(this._auth, provider);

      return result;
    } catch (error: any) {
      return error;
    }
  }
}