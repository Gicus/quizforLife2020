import {Component, OnInit} from '@angular/core';
import {TestService} from '../../services/test/test.service';
import {TestModel} from '../../model/test-model/test-model';
import {QuestionModel} from '../../model/question-model/question-model';
import {Router} from '@angular/router';
import {cloneDeep} from 'lodash';
import {Subscription} from 'rxjs';
import {AuthenticationService} from '../../services/auth/authentication.service';
import {UserModel} from '../../model/user-model/user-model';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-create-test',
  templateUrl: './create-test.component.html',
  styleUrls: ['./create-test.component.css']
})
export class CreateTestComponent implements OnInit {

  public test: TestModel = new TestModel();
  public question: QuestionModel = new QuestionModel(1, 0);
  public currentQuestionNumber = 1;
  public currentQuestionId = 0;
  public rightAnswers: string[] = ['A', 'B', 'C', 'D', 'E'];
  public testIsCreated = false;
  public testsIds: string[] = [''];
  public testsIds$: Subscription;
  public currentUser: UserModel = new UserModel();
  public showHomeButton = true;

  constructor(private testService: TestService, private router: Router, private authenticationService: AuthenticationService) {
    const user: any = JSON.parse(localStorage.getItem('user'));
    if (!!user) {
      this.currentUser.email = user.email ? user.email : '';
      this.currentUser.name.firstName = user.name ? user.name.split(' ')[1] : '';
      this.currentUser.name.lastName = user.name ? user.name.split(' ')[0] : '';
    }
    this.showHomeButton = !this.authenticationService.isLoggedIn();
  }

  ngOnInit(): void {
    this.testsIds$ = this.testService.getAllTestsIds().subscribe(testsIds => this.testsIds = cloneDeep(testsIds));
    const currentUser = JSON.parse(localStorage.getItem('user'));
    if (!!currentUser && !!currentUser.email) {
      this.test.creator.email = currentUser.email;
    }
  }

  public addCurrentQuestion(form: NgForm): void {
    this.test.questions.push(this.question);
    this.test.calculateTotalValue();
    this.question = new QuestionModel(++this.currentQuestionNumber, ++this.currentQuestionId);
    form.resetForm();
  }

  public isUniqueTestId(): boolean {
    return this.testsIds.indexOf(this.test.id) === -1;
  }

  public createTest(): void {
    if (!this.testIsCreated && this.isUniqueTestId()) {
      this.testService.postTest(this.test);
    }
    this.testIsCreated = true;
  }

  public goToHome(): void {
    this.router.navigate(['/']);
  }

  public goToTest(): void {
    if (this.authenticationService.isLoggedIn()) {
      this.router.navigate([`dashboard/view-test/${this.test.id}`], {state: {user: this.currentUser}});
    } else {
      this.router.navigate(['/access-test'], {state: {testId: this.test.id}});
    }

  }
}
