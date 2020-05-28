import {Component, OnInit} from '@angular/core';
import {UserModel} from '../../model/user-model/user-model';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public testId: string;
  public user: UserModel = new UserModel();
  public userIsCreated = false;
  public userIsNotCreated = false;

  constructor(private router: Router, private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
  }

  signUp(): void {
    if (!!this.user.email && !!this.user.password) {
      this.authenticationService
        .signUp(this.user.email, this.user.password, `${this.user.name.lastName + ' ' + this.user.name.firstName}`)
        .then(() => {
        this.userIsCreated = true;
        this.userIsNotCreated = false;
        setTimeout(() => this.gotToLogin(), 3000);
      },
          () => {
            this.userIsNotCreated = true;
          });
    }
  }

  public gotToLogin(): void {
    this.router.navigate(['/login']);
  }

  public close() {
    this.userIsCreated = false;
  }
}
