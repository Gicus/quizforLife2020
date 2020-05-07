import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {isNotNullOrUndefined} from 'codelyzer/util/isNotNullOrUndefined';
import {AuthenticationService} from '../../services/auth/authentication.service';

@Component({
  selector: 'app-validation-test',
  templateUrl: './validation-test.component.html',
  styleUrls: ['./validation-test.component.css']
})
export class ValidationTestComponent implements OnInit {

  public mark;
  public testTotalValue;
  public testId;
  public showHomeButton = true;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    if (!!this.router.getCurrentNavigation() &&
      !!this.router.getCurrentNavigation().extras &&
      !!this.router.getCurrentNavigation().extras.state) {
      this.mark = this.router.getCurrentNavigation().extras.state.mark;
      this.testTotalValue = this.router.getCurrentNavigation().extras.state.testTotalValue;
      this.testId = this.router.getCurrentNavigation().extras.state.testId;
    }

    if (!isNotNullOrUndefined(this.mark) || !isNotNullOrUndefined(this.testTotalValue) || !isNotNullOrUndefined(this.testId)) {
      this.goToAccess();
    }
    this.showHomeButton = !this.authenticationService.isLoggedIn();
  }

  ngOnInit(): void {
  }

  public goToHome(): void {
    this.router.navigate(['/']);
  }
  public goToAccess(): void {
    this.router.navigate([`${this.authenticationService.isLoggedIn() ? 'dashboard' : ''}/access-test`]);
  }

  public goToRanking(): void {
    this.router.navigate([`${this.authenticationService.isLoggedIn() ? 'dashboard' : ''}/ranking/${this.testId}`]);
  }

}
