import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../services/auth/authentication.service';
import {FormGroup} from "@angular/forms";
import {FormlyFieldConfig} from "@ngx-formly/core";
import {FormlyService} from "../../services/formly.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public form = new FormGroup({});
  public user = { email: '', password: '' };
  public fields: FormlyFieldConfig[] = [];

  constructor(private router: Router,
              private authenticationService: AuthenticationService,
              private formlyService: FormlyService) {
    this.fields = formlyService.loginConfig;
  }

  ngOnInit(): void {
  }

  signIn(): void {
    if (this.form.valid) {
      this.authenticationService.signIn(this.user.email, this.user.password).then(
        ((x) => {
          this.router.navigate(['/dashboard/my-marks']);
        })
      );
    }
  }
}
