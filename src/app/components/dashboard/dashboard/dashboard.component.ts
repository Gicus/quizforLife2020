import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from '../../../services/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public currentUser: any = JSON.parse(localStorage.getItem('user'));

  constructor(private router: Router, private authenticationService: AuthenticationService) {
  }

  ngOnInit(): void {
  }

  public navigateToAccessTest(): void {
    this.router.navigate(['/dashboard/access-test']);
  }

  public navigateToCreateTest(): void {
    this.router.navigate(['/dashboard/create-test']);
  }

  public navigateToMyCreatedTests(): void {
    this.router.navigate(['/dashboard/my-created-tests']);
  }

  public navigateToMyMarks(): void {
    this.router.navigate(['/dashboard/my-marks']);
  }

  public logOut(): void {
    this.authenticationService.signOut().then(() => this.router.navigate(['/']));
  }

}
