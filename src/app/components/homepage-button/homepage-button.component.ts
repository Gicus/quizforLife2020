import {Component} from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-homepage-button',
  templateUrl: './homepage-button.component.html',
  styleUrls: ['./homepage-button.component.css']
})
export class HomepageButtonComponent {
  public show = false;

  constructor(private router: Router,
              private authenticationService: AuthenticationService) {
    this.show = !this.authenticationService.isLoggedIn();
  }
}
