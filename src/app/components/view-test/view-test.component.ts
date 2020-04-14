import {mergeMap} from 'rxjs/operators';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {TestService} from '../../services/test/test.service';
import {combineLatest} from 'rxjs';
import {TestModel} from '../../model/test-model/test-model';
import {TestResponseModel} from '../../model/test-response-model/test-response-model';
import {MarkModel} from '../../model/mark-model/mark-model';

import {cloneDeep} from 'lodash';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {DateService} from '../../services/date/date.service';
import {UserModel} from '../../model/user-model/user-model';
import {QuestionModel} from '../../model/question-model/question-model';

@Component({
  selector: 'app-view-test',
  templateUrl: './view-test.component.html',
  styleUrls: ['./view-test.component.css']
})
export class ViewTestComponent implements OnInit, OnDestroy {

  test: TestModel;
  testResponse: TestResponseModel = new TestResponseModel();
  currentMark: MarkModel = new MarkModel();
  marks: MarkModel[] = [];
  currentUser: UserModel;
  isTestIdValid = true;
  isTestAlreadySubmittedByCurrentUser = false;
  isTestExpired = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private testService: TestService,
    private dateService: DateService
  ) {
    if (!!this.router.getCurrentNavigation() &&
      !!this.router.getCurrentNavigation().extras &&
      !!this.router.getCurrentNavigation().extras.state) {
      this.currentUser = this.router.getCurrentNavigation().extras.state.user;
    }
    if (!this.currentUser) {
      this.router.navigate(['/access-test']);
    }
  }

  ngOnInit() {
    combineLatest(this.route.paramMap.pipe(
      mergeMap((params: ParamMap) =>
        this.testService.getTest(params.get('id')))), this.route.paramMap.pipe(
      mergeMap((params: ParamMap) =>
        this.testService.getMarksForSpeciedTest(params.get('id'))))).subscribe(([test, marks]: [TestModel[], MarkModel[]]) => {
      if (!!test[0]) {
        this.test = cloneDeep(test[0]);
        this.isTestIdValid = true;
        this.isTestExpired = this.checkTestExpirationDate(this.test.dueDate);
      } else {
        this.isTestIdValid = false;
      }
      const currentUserMark = this.searchCurrentUserMark(marks);
      if (!!currentUserMark) {
        this.currentMark = currentUserMark;
        this.isTestAlreadySubmittedByCurrentUser = true;
      } else {
        this.isTestAlreadySubmittedByCurrentUser = false;
      }
    });
  }

  public checkTestExpirationDate(dueDate: NgbDateStruct): boolean {
    return this.dateService.isDateBeforeCurrentDate(dueDate);
  }

  public getAnswerValue(question: QuestionModel, answerId: string): string {
    return question.answers.find(answer => answer.id = answerId).value;
  }

  public submitTest(): void {
    this.currentMark.value = this.gradeTest();
    this.currentMark.testId = this.test.id;
    this.currentMark.answers = this.testResponse.answers;
    this.currentMark.user = this.currentUser;
    this.testService.postMark(this.currentMark);
    this.goToValidation(this.currentMark.value, this.currentMark.testId, this.test.totalValue);
  }

  public gradeTest(): number {
    let testValue = 0;
    this.testResponse.answers.forEach((answer, index) => {
      if (answer === this.test.questions[index].rightAnswer) {
        testValue += this.test.questions[index].value;
      }
    });
    return testValue;
  }

  public goToAccess(): void {
    this.router.navigate(['/access-test']);
  }

  public goToRanking(): void {
    this.router.navigate([`/ranking/${this.test.id}`]);
  }

  public goToValidation(mark: number, testId: string, testTotalValue: number): void {
    this.router.navigate(['/validation-test'], {state: {mark, testId, testTotalValue}});
  }

  private searchCurrentUserMark(marks: MarkModel[]): MarkModel {
    return marks.find(mark =>
      mark.user.email === this.currentUser.email &&
      mark.user.name.lastName === this.currentUser.name.lastName &&
      mark.user.name.firstName === this.currentUser.name.firstName);
  }

  ngOnDestroy() {
  }
}
