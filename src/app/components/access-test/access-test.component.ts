import {Component, OnInit} from '@angular/core';
import {UserModel} from '../../model/user-model/user-model';
import {Router} from '@angular/router';


@Component({
  selector: 'app-access-test',
  templateUrl: './access-test.component.html',
  styleUrls: ['./access-test.component.css']
})
export class AccessTestComponent implements OnInit {


  public testId: string;
  public user: UserModel = new UserModel();

  constructor(private router: Router) {
  }

  ngOnInit(): void {}

  public goToTest(): void {
    this.router.navigate([`/view-test/${this.testId}`], {state: {user: this.user}});
  }
}

