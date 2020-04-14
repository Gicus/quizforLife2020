import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {AngularFireAuth} from '@angular/fire/auth';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  constructor(
    private router: Router,
    private angularFireAuth: AngularFireAuth
  ) {
  }

  canActivate(): Observable<boolean> {
    return this.angularFireAuth.authState.pipe(map((user) => {
      if (!!user && !!user.getIdToken()) {
        return true;
      } else {
        this.router.navigate(['/login']);
        return false;
      }

    }));
  }
}
