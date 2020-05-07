import {Injectable} from '@angular/core';
import {CanActivate, CanActivateChild, Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate, CanActivateChild {
  constructor(
    private router: Router,
    private angularFireAuth: AngularFireAuth
  ) {
  }

  canActivate(): Observable<boolean> {
    return this.angularFireAuth.authState.pipe(map((user) => {
      if (!!user && !!user.getIdToken()) {
        const currentUser: string = JSON.stringify({name: user.displayName, email: user.email});
        localStorage.setItem('user', currentUser);
        return true;
      } else {
        this.router.navigate(['/login']);
        return false;
      }

    }));
  }

  canActivateChild(): Observable<boolean> {
    return this.angularFireAuth.authState.pipe(map((user) => {
      if (!!user && !!user.getIdToken()) {
        const currentUser: string = JSON.stringify({name: user.displayName, email: user.email});
        localStorage.setItem('user', currentUser);
        return true;
      } else {
        this.router.navigate(['/login']);
        return false;
      }

    }));
  }
}
