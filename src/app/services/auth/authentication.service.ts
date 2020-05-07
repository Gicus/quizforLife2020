import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private angularFireAuth: AngularFireAuth) {
  }

  public isLoggedIn() {
    return JSON.parse(localStorage.getItem('user')) != null;
  }

  /* Sign up */
  public signUp(email: string, password: string, displayName: string): Promise<firebase.auth.UserCredential> {
    return new Promise<any>((resolve, reject) => {
      this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password)
        .then(() => {
        }, err => reject(err));
      this.angularFireAuth.auth.onAuthStateChanged((user) => {
        user.updateProfile({displayName}).then(res => {
          resolve(res);
        }, err => reject(err));
      });
    });
  }

  /* Sign in */
  public signIn(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return new Promise<any>((resolve, reject) => {
      this.angularFireAuth.auth.signInWithEmailAndPassword(email, password)
        .then(res => {
          resolve(res);
        }, err => reject(err));
    });
  }

  /* Sign out */
  public signOut(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (this.angularFireAuth.auth.currentUser) {
        this.angularFireAuth.auth.signOut();
        localStorage.setItem('user', null);
        resolve();
      } else {
        reject();
      }
    });
  }

  public resetPassword(email: string): Promise<void> {
    return this.angularFireAuth.auth.sendPasswordResetEmail(
      email,
      {url: 'http://localhost:4200/login'});
  }
}
