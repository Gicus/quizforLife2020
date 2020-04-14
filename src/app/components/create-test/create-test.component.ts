import {Component, OnInit} from '@angular/core';
import {TestService} from '../../services/test/test.service';
import {TestModel} from '../../model/test-model/test-model';
import {QuestionModel} from '../../model/question-model/question-model';
import {Router} from '@angular/router';
import {cloneDeep} from 'lodash';
import {Subscription} from 'rxjs';

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

  constructor(private testService: TestService, private router: Router) {
  }

  ngOnInit(): void {
    this.testsIds$ = this.testService.getAllTestsIds().subscribe(testsIds => this.testsIds = cloneDeep(testsIds));
  }

  public addCurrentQuestion(): void {
    this.test.questions.push(this.question);
    this.test.calculateTotalValue();
    this.question = new QuestionModel(++this.currentQuestionNumber, ++this.currentQuestionId);
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

  public goToTest(): void {
    this.router.navigate([`/view-test/${this.test.id}`]);
  }
}
