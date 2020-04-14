import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFireAuth} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private user: Observable<firebase.User>;
  private userDetails: firebase.User = null;

  constructor(private angularFireAuth: AngularFireAuth) {
    angularFireAuth.authState.subscribe(user => {
      if (user) {
        this.userDetails = user;
        localStorage.setItem('user', JSON.stringify(this.userDetails));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    });
  }

  public isLoggedIn() {
    if (this.userDetails == null) {
      return false;
    } else {
      return true;
    }
  }

  /* Sign up */
  public signUp(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return new Promise<any>((resolve, reject) => {
      this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password)
        .then(res => {
          resolve(res);
        }, err => reject(err));
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
