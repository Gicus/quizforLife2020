import {Component, OnInit} from '@angular/core';
import {UserModel} from '../../model/user-model/user-model';
import {Router} from '@angular/router';
import {TestService} from '../../services/test/test.service';


@Component({
  selector: 'app-access-test',
  templateUrl: './access-test.component.html',
  styleUrls: ['./access-test.component.css']
})
export class AccessTestComponent implements OnInit {


  public testId: string;
  public user: UserModel = new UserModel();

  constructor(private router: Router, private testService: TestService) {
  }

  ngOnInit(): void {}

  public goToTest(): void {
    this.router.navigate([`/view-test/${this.testId}`], {state: {user: this.user}});
  }
}
