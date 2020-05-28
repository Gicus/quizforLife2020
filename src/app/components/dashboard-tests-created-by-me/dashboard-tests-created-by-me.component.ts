import {Component, OnInit} from '@angular/core';
import {TestModel} from '../../model/test-model/test-model';
import {cloneDeep} from 'lodash';
import {Router} from '@angular/router';
import {TestService} from '../../services/test.service';
import {UserModel} from '../../model/user-model/user-model';

@Component({
  selector: 'app-dashboard-tests-created-by-me',
  templateUrl: './dashboard-tests-created-by-me.component.html',
  styleUrls: ['./dashboard-tests-created-by-me.component.css']
})
export class DashboardTestsCreatedByMeComponent implements OnInit {

  public currentUser: UserModel = new UserModel();
  public testsCreatedByMe: TestModel[] = [];

  constructor(private router: Router, private testService: TestService) {
    const user: any = JSON.parse(localStorage.getItem('user'));
    if (!!user) {
      this.currentUser.email = user.email ? user.email : '';
      this.currentUser.name.firstName = user.name ? user.name.split(' ')[1] : '';
      this.currentUser.name.lastName = user.name ? user.name.split(' ')[0] : '';
    }
  }

  ngOnInit(): void {
    this.testService.getTestsByCreator(this.currentUser.email).subscribe((tests: TestModel[]) => {
      this.testsCreatedByMe = cloneDeep(tests);
    });
  }

  public navigateToViewTest(testId: string): void {
    this.router.navigate([`dashboard/view-test/${testId}`], {state: {user: this.currentUser}});
  }

}
