import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../services/authentication.service';
import {FormlyService} from "../../services/formly.service";
import {FormGroup} from "@angular/forms";
import {FormlyFieldConfig} from "@ngx-formly/core";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  public testId: string;
  public userIsCreated = false;
  public userIsNotCreated = false;

  public form = new FormGroup({});
  public user = { firstName: '', lastName: '', email: '', password: { password: '', confirmPassword: '' } };
  public fields: FormlyFieldConfig[] = [];

  constructor(private router: Router,
              private authenticationService: AuthenticationService,
              private formlyService: FormlyService) {
    this.fields = this.formlyService.registerConfig;
  }

  signUp(): void {
    if (this.form.valid) {
      this.authenticationService
        .signUp(this.user.email, this.user.password.password, `${this.user.lastName + ' ' + this.user.firstName}`)
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
    this.router.navigate(['login']);
  }

  public close() {
    this.userIsCreated = false;
  }
}
