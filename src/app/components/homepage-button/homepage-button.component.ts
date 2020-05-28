import {Component} from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'app-homepage-button',
  templateUrl: './homepage-button.component.html',
  styleUrls: ['./homepage-button.component.css']
})
export class HomepageButtonComponent {
  constructor(public authenticationService: AuthenticationService) {
  }
}
