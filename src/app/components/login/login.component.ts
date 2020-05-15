import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../services/auth/authentication.service';
import {UserModel} from '../../model/user-model/user-model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user: UserModel = new UserModel();
  public showHomeButton = true;

  constructor(private router: Router, private authenticationService: AuthenticationService) {
    this.showHomeButton = !this.authenticationService.isLoggedIn();
  }

  ngOnInit(): void {
  }

  signIn(): void {
    if (!!this.user.email && !!this.user.password) {
      this.authenticationService.signIn(this.user.email, this.user.password).then(
        ((x) => {
          this.router.navigate(['/dashboard/my-marks']);
        })
      );
    }
  }

  public goToHome(): void {
    this.router.navigate(['/']);
  }
}
