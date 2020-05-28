import {Component, OnInit} from '@angular/core';
import {MarkModel} from '../../model/mark-model/mark-model';
import {UserModel} from '../../model/user-model/user-model';
import {Router} from '@angular/router';
import {TestService} from '../../services/test.service';
import {cloneDeep} from 'lodash';

@Component({
  selector: 'app-dashboard-my-tests',
  templateUrl: './dashboard-my-marks.component.html',
  styleUrls: ['./dashboard-my-marks.component.css']
})
export class DashboardMyMarksComponent implements OnInit {

  public myMarks: MarkModel[] = [];
  public currentUser: UserModel = new UserModel();

  constructor(private router: Router, private testService: TestService) {
    const user: any = JSON.parse(localStorage.getItem('user'));
    if (!!user) {
      this.currentUser.email = user.email ? user.email : '';
      this.currentUser.name.firstName = user.name ? user.name.split(' ')[1] : '';
      this.currentUser.name.lastName = user.name ? user.name.split(' ')[0] : '';
    }
  }

  ngOnInit(): void {
    this.testService.getMyMarks(this.currentUser.email).subscribe((myMarks: MarkModel[]) => {
      this.myMarks = cloneDeep(myMarks);
    });
  }

  public navigateToViewTest(testId: string): void {
    this.router.navigate([`dashboard/view-test/${testId}`], {state: {user: this.currentUser}});
  }
}
