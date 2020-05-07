import {Component, OnInit} from '@angular/core';
import {UserModel} from '../../model/user-model/user-model';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../services/auth/authentication.service';


@Component({
  selector: 'app-access-test',
  templateUrl: './access-test.component.html',
  styleUrls: ['./access-test.component.css']
})
export class AccessTestComponent implements OnInit {


  public testId: string;
  public currentUser: UserModel = new UserModel();
  public showHomeButton = true;

  constructor(private router: Router, private authenticationService: AuthenticationService) {
    const user: any = JSON.parse(localStorage.getItem('user'));
    if (!!user) {
      this.currentUser.email = user.email ? user.email : '';
      this.currentUser.name.firstName = user.name ? user.name.split(' ')[1] : '';
      this.currentUser.name.lastName = user.name ? user.name.split(' ')[0] : '';
    }

    if (!!this.router.getCurrentNavigation() &&
      !!this.router.getCurrentNavigation().extras &&
      !!this.router.getCurrentNavigation().extras.state) {
      this.testId = this.router.getCurrentNavigation().extras.state.testId;
    }
    this.showHomeButton = !this.authenticationService.isLoggedIn();

  }

  ngOnInit(): void {
  }

  public goToHome(): void {
    this.router.navigate(['/']);
  }

  public goToTest(): void {
    this.router.navigate([`${this.authenticationService.isLoggedIn() ? 'dashboard' : ''}/view-test/${this.testId}`], {state: {user: this.currentUser}});
  }
}

