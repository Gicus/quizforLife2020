import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../services/auth/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  public emailIsSent = false;
  public emailToReset: string;

  constructor(private router: Router, private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
  }

  public resetPassword(): void {
    if (!!this.emailToReset) {
      this.authenticationService.resetPassword(this.emailToReset).then(() => this.emailIsSent = true);
    }
  }

  public close() {
    this.emailIsSent = false;
  }
}
