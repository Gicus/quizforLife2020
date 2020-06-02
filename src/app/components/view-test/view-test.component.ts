import {mergeMap, switchMap, tap} from 'rxjs/operators';
import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {TestService} from '../../services/test/test.service';
import {combineLatest, forkJoin, Observable, of} from 'rxjs';
import {TestModel} from '../../model/test-model/test-model';
import {TestResponseModel} from '../../model/test-response-model/test-response-model';
import {MarkModel} from '../../model/mark-model/mark-model';

import {cloneDeep} from 'lodash';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {DateService} from '../../services/date/date.service';
import {UserModel} from '../../model/user-model/user-model';
import {QuestionModel} from '../../model/question-model/question-model';
import {AuthenticationService} from '../../services/auth/authentication.service';
import {AnswerModel} from '../../model/answer-model/answer-model';

@Component({
  selector: 'app-view-test',
  templateUrl: './view-test.component.html',
  styleUrls: ['./view-test.component.css']
})
export class ViewTestComponent implements OnInit, OnDestroy {

  public test: TestModel;
  public testResponse: TestResponseModel = new TestResponseModel();
  public currentMark: MarkModel = new MarkModel();
  public marks: MarkModel[] = [];
  public currentUser: UserModel;
  public isTestIdValid = true;
  public isTestAlreadySubmittedByCurrentUser = false;
  public isTestExpired = false;
  public showHomeButton = true;
  public isSendingResponses = false;

  public imgSrcs: string[] = [
    './assets/img/image_placeholder.jpg',
    './assets/img/image_placeholder.jpg',
    './assets/img/image_placeholder.jpg',
    './assets/img/image_placeholder.jpg',
    './assets/img/image_placeholder.jpg',
    './assets/img/image_placeholder.jpg',
    './assets/img/image_placeholder.jpg',
    './assets/img/image_placeholder.jpg',
    './assets/img/image_placeholder.jpg',
    './assets/img/image_placeholder.jpg',
    './assets/img/image_placeholder.jpg',
    './assets/img/image_placeholder.jpg',
    './assets/img/image_placeholder.jpg',
    './assets/img/image_placeholder.jpg',
    './assets/img/image_placeholder.jpg',
    './assets/img/image_placeholder.jpg',
    './assets/img/image_placeholder.jpg',
    './assets/img/image_placeholder.jpg',
    './assets/img/image_placeholder.jpg',
    './assets/img/image_placeholder.jpg',
    './assets/img/image_placeholder.jpg',
    './assets/img/image_placeholder.jpg',];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private testService: TestService,
    private authenticationService: AuthenticationService,
    private dateService: DateService,
  ) {
    if (!!this.router.getCurrentNavigation() &&
      !!this.router.getCurrentNavigation().extras &&
      !!this.router.getCurrentNavigation().extras.state) {
      this.currentUser = this.router.getCurrentNavigation().extras.state.user;
    }
    if (!this.currentUser) {
      this.router.navigate(['/access-test']);
    }
    this.showHomeButton = !this.authenticationService.isLoggedIn();
  }

  ngOnInit() {
    // noinspection JSDeprecatedSymbols
    combineLatest(this.route.paramMap.pipe(
      mergeMap((params: ParamMap) =>
        this.testService.getTest(params.get('id')))), this.route.paramMap.pipe(
      mergeMap((params: ParamMap) =>
        this.testService.getMarksForSpecifiedTest(params.get('id'))))).subscribe(([test, marks]: [TestModel[], MarkModel[]]) => {
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

  public isYoutubeVideoLinkValid(youtubeLink: string): boolean {
    const regExp = new RegExp('/^(?:https?:\\/\\/)?(?:www\\.)?(?:youtube\\.com|youtu\\.be)\\/watch\\?v=([^&]+)/m');
    return !!youtubeLink.match(regExp);
  }

  public checkTestExpirationDate(dueDate: NgbDateStruct): boolean {
    return this.dateService.isDateBeforeCurrentDate(dueDate);
  }

  public getAnswerValue(question: QuestionModel, answerId: string): string {
    return question.answers.find(answer => answer.id = answerId).value;
  }

  public setAnswerValue($event, questionId): any {
    if (!this.testResponse.answers[questionId]) {
      this.testResponse.answers[questionId] = new AnswerModel();
    }
    this.testResponse.answers[questionId].value = $event.target.value;
  }

  public showPreview(event: any, questionId: any) {
    if (!this.testResponse.answers[questionId]) {
      this.testResponse.answers[questionId] = new AnswerModel();
    }
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imgSrcs[questionId] = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.testResponse.answers[questionId].selectedImage = event.target.files[0];
    } else {
      this.imgSrcs[questionId] = './assets/img/image_placeholder.jpg';
      this.testResponse.answers[questionId].selectedImage = null;
    }
  }

  public submitTest(): void {
    this.isTestExpired = this.checkTestExpirationDate(this.test.dueDate);
    if (!this.isTestExpired) {
      this.isSendingResponses = true;
      this.uploadImages().subscribe(() => {
        this.currentMark.value = this.gradeTest();
        this.currentMark.testId = this.test.id;
        this.currentMark.answers = this.testResponse.answers;
        this.currentMark.user = this.currentUser;
        this.testService.postMark(this.currentMark);
        this.goToValidation(this.currentMark.value, this.currentMark.testId, this.test.totalValue);
      }, ()=> {}, () => {this.isSendingResponses = false});
    }
  }

  public gradeTest(): number {
    let testValue = 0;
    this.testResponse.answers.forEach((answer, index) => {
      if (answer.value === this.test.questions[index].rightAnswer) {
        testValue += this.test.questions[index].value;
      }
    });
    return testValue;
  }

  public goToHome(): void {
    this.router.navigate(['/']);
  }

  public goToAccess(): void {
    this.router.navigate([`${this.authenticationService.isLoggedIn() ? 'dashboard' : ''}/access-test`]);
  }

  public goToRanking(): void {
    this.router.navigate([`${this.authenticationService.isLoggedIn() ? 'dashboard' : ''}/ranking/${this.test.id}`]);
  }

  public goToValidation(mark: number, testId: string, testTotalValue: number): void {
    this.router.navigate([`${this.authenticationService.isLoggedIn() ? 'dashboard' : ''}/validation-test`], {
      state: {
        mark,
        testId,
        testTotalValue
      }
    });
  }

  ngOnDestroy() {
  }

  private uploadImages(): Observable<any> {
    const uploadImages$: Observable<any>[] = [];
    this.testResponse.answers.forEach(answer => {
      delete answer.id;
      if (!!answer.selectedImage) {
        const filePath = `${answer.selectedImage.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
        answer.filePath = filePath;
        uploadImages$.push(this.testService.uploadPhoto(filePath, answer.selectedImage));
      }
    });

    return uploadImages$.length === 0 ? of([]) : forkJoin(uploadImages$).pipe(
      switchMap(() => forkJoin(this.testResponse.answers.map((answer: AnswerModel) =>
        !!answer.filePath ? this.testService.getDownloadUrl(answer.filePath) : of([])))),
      tap((downloadUrls: []) => {
        downloadUrls.forEach((downloadUrl: string, index: number) => {
          if (typeof downloadUrl === 'string') {
            this.testResponse.answers[index].imageUrl = downloadUrl;
            delete this.testResponse.answers[index].filePath;
            delete this.testResponse.answers[index].selectedImage;
            this.testResponse.answers[index].value = !this.testResponse.answers[index].value ?
              'image' : this.testResponse.answers[index].value;
          }
        });
      }));
  }

  private searchCurrentUserMark(marks: MarkModel[]): MarkModel {
    return marks.find(mark =>
      mark.user.email === this.currentUser.email &&
      mark.user.name.lastName === this.currentUser.name.lastName &&
      mark.user.name.firstName === this.currentUser.name.firstName);
  }
}
