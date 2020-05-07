import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../services/auth/authentication.service';

@Component({
  selector: 'app-split-create-access',
  templateUrl: './split-create-access.component.html',
  styleUrls: ['./split-create-access.component.css']
})
export class SplitCreateAccessComponent implements OnInit {

  constructor(private router: Router, private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
  }

  public navigateToCreateTest(): void {
    this.router.navigate([`${this.authenticationService.isLoggedIn() ? 'dashboard' : ''}/create-test`]);
  }

  public navigateToAccessTest(): void {
    this.router.navigate([`${this.authenticationService.isLoggedIn() ? 'dashboard' : ''}/access-test`]);
  }

  public navigateToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }

}
