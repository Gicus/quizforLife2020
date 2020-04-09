import {Component, OnInit} from '@angular/core';
import {UserModel} from '../../../model/user-model/user-model';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../../services/auth/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public testId: string;
  public user: UserModel = new UserModel();

  constructor(private router: Router, private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
  }

  signUp(): void {
    if (!!this.user.email && !!this.user.password) {
      this.authenticationService.signUp(this.user.email, this.user.password);
    }
  }
}
