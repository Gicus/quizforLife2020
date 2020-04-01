import {mergeMap} from 'rxjs/operators';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {TestService} from '../../services/test/test.service';
import {Subscription} from 'rxjs';
import {TestModel} from '../../model/test-model/test-model';
import {TestResponseModel} from '../../model/test-response-model/test-response-model';
import {MarkModel} from '../../model/mark-model/mark-model';

import {cloneDeep} from 'lodash';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {DateService} from '../../services/date/date.service';

@Component({
  selector: 'app-view-test',
  templateUrl: './view-test.component.html',
  styleUrls: ['./view-test.component.css']
})
export class ViewTestComponent implements OnInit, OnDestroy {

  test$: Subscription;
  test: TestModel;
  testResponse: TestResponseModel = new TestResponseModel();
  validationIsSent = false;
  mark: MarkModel = new MarkModel();
  marks: MarkModel[] = [];
  isTestExpired = false;
  isTestIdValid = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private testService: TestService,
    private dateService: DateService
  ) {
    if (!!this.router.getCurrentNavigation() &&
      !!this.router.getCurrentNavigation().extras &&
      !!this.router.getCurrentNavigation().extras.state) {
      this.mark.user = this.router.getCurrentNavigation().extras.state.user;
    }
    if (!this.mark.user) {
      this.router.navigate(['/access-test']);
    }
  }

  ngOnInit() {
    this.test$ = this.route.paramMap.pipe(
      mergeMap((params: ParamMap) =>
        this.testService.getTest(params.get('id')))).subscribe(test => {
      if (!!test[0]) {
        this.test = cloneDeep(test[0]);
        this.isTestIdValid = true;
      } else {
        this.isTestIdValid = false;
      }
      this.checkTestExpirationDate(this.test.dueDate);
    });
  }

  public checkTestExpirationDate(dueDate: NgbDateStruct) {
    this.isTestExpired = this.dateService.isDateBeforeCurrentDate(dueDate) ? false : true;
  }

  public submitTest(): void {
    this.gradeTest();
    this.mark.testId = this.test.id;
    this.testService.postMark(this.mark);
    this.validationIsSent = true;
  }

  public gradeTest(): void {
    this.testResponse.answers.forEach((answer, index) => {
      if (answer === this.test.questions[index].rightAnswer) {
        this.mark.value += this.test.questions[index].value;
      }
    });
  }

  public goToRanking(): void {
    this.router.navigate([`/ranking/${this.test.id}`]);
  }

  public goToAccess(): void {
    this.router.navigate(['/access-test']);
  }

  ngOnDestroy() {
    if (!!this.test$) {
      this.test$.unsubscribe();
    }
  }
}
