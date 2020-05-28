import {Component, OnInit} from '@angular/core';
import {TestService} from '../../services/test.service';
import {TestModel} from '../../model/test-model/test-model';
import {QuestionModel} from '../../model/question-model/question-model';
import {Router} from '@angular/router';
import {cloneDeep} from 'lodash';
import {Subscription} from 'rxjs';
import {AuthenticationService} from '../../services/authentication.service';
import {UserModel} from '../../model/user-model/user-model';
import {FormGroup, NgForm} from '@angular/forms';
import {FormlyService} from "../../formly/formly.service";
import {FormlyFieldConfig} from "@ngx-formly/core";

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

  public imgSrc: string = './assets/img/image_placeholder.jpg';
  public selectedImage: any = null;

  public questionIsAdded = false;
  public questionIsNotAdded = false;

  public isAuthenticated: boolean;

  public testForm = new FormGroup({});
  public tes = { firstName: '', lastName: '', email: '', password: { password: '', confirmPassword: '' } };
  public testFields: FormlyFieldConfig[] = [];

  constructor(private testService: TestService,
              private router: Router,
              private authenticationService: AuthenticationService,
              private formlyService: FormlyService) {
    this.testFields = this.formlyService.testConfig;
    const user: any = JSON.parse(localStorage.getItem('user'));
    if (!!user) {
      this.currentUser.email = user.email ? user.email : '';
      this.currentUser.name.firstName = user.name ? user.name.split(' ')[1] : '';
      this.currentUser.name.lastName = user.name ? user.name.split(' ')[0] : '';
    }
    this.isAuthenticated = this.authenticationService.isLoggedIn();
  }

  ngOnInit(): void {
    this.testsIds$ = this.testService.getAllTestsIds().subscribe(testsIds => this.testsIds = cloneDeep(testsIds));
    const currentUser = JSON.parse(localStorage.getItem('user'));
    if (!!currentUser && !!currentUser.email) {
      this.test.creator.email = currentUser.email;
    }
  }

  public showPreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imgSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    } else {
      this.imgSrc = './assets/img/image_placeholder.jpg';
      this.selectedImage = null;
    }
  }

  public addCurrentQuestion(form: NgForm): void {
    const filePath = `${this.selectedImage.name.split('.').slice(0, -1).join('.')}_${new Date().getTime()}`;
    this.testService.uploadPhoto(filePath, this.selectedImage).subscribe(() => {
    }, () => {
    }, () =>
      this.testService.getDownloadUrl(filePath).subscribe((url: string) => {
        this.question.imageUrl = url;
        this.test.questions.push(this.question);
        this.test.calculateTotalValue();
        this.question = new QuestionModel(++this.currentQuestionNumber, ++this.currentQuestionId);

        // reset form after question is added;
        form.resetForm();
        (document.getElementById('imageUrl') as HTMLInputElement).value = '';
        this.imgSrc = './assets/img/image_placeholder.jpg';
        this.selectedImage = null;

        this.questionIsAdded = true;
        setTimeout(() => this.closeQuestionAlerts(), 3000);
      }));
  }

  public closeQuestionAlerts() {
    this.questionIsAdded = false;
    this.questionIsNotAdded = false;
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
    if (this.authenticationService.isLoggedIn()) {
      this.router.navigate([`dashboard/view-test/${this.test.id}`], {state: {user: this.currentUser}});
    } else {
      this.router.navigate(['/access-test'], {state: {testId: this.test.id}});
    }
  }
}
