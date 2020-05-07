import {Component, OnInit} from '@angular/core';
import {UserModel} from '../../model/user-model/user-model';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../services/auth/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public testId: string;
  public user: UserModel = new UserModel();
  public showHomeButton = true;

  constructor(private router: Router, private authenticationService: AuthenticationService) {
    this.showHomeButton = !this.authenticationService.isLoggedIn();
  }

  ngOnInit(): void {
  }

  signUp(): void {
    if (!!this.user.email && !!this.user.password) {
      this.authenticationService.signUp(this.user.email, this.user.password, `${this.user.name.lastName + ' ' + this.user.name.firstName}`);
    }
  }

  public goToHome(): void {
    this.router.navigate(['/']);
  }
}
