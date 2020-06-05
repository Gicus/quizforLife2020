import {Component, OnInit, TemplateRef} from '@angular/core';
import {TestModel} from '../../model/test-model/test-model';
import {cloneDeep} from 'lodash';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {TestService} from '../../services/test/test.service';
import {UserModel} from '../../model/user-model/user-model';
import {combineLatest} from 'rxjs';
import {mergeMap} from 'rxjs/operators';
import {MarkModel} from '../../model/mark-model/mark-model';
import {QuestionModel} from '../../model/question-model/question-model';
import {NameModel} from '../../model/name-model/name-model';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dashboard-tests-created-by-me',
  templateUrl: './dashboard-tests-solutions.component.html',
  styleUrls: ['./dashboard-tests-solutions.component.css']
})
export class DashboardTestSolutionsComponent implements OnInit {

  public currentUser: UserModel = new UserModel();
  public marks: MarkModel[] = [];
  public test: TestModel;
  public modalImageUrl: string;
  public modalTitle: string;


  constructor(private route: ActivatedRoute, private router: Router, private testService: TestService, private modalService: NgbModal) {
    const user: any = JSON.parse(localStorage.getItem('user'));
    if (!!user) {
      this.currentUser.email = user.email ? user.email : '';
      this.currentUser.name.firstName = user.name ? user.name.split(' ')[1] : '';
      this.currentUser.name.lastName = user.name ? user.name.split(' ')[0] : '';
    }
  }

  ngOnInit(): void {
    combineLatest(this.route.paramMap.pipe(
      mergeMap((params: ParamMap) =>
        this.testService.getTest(params.get('id')))), this.route.paramMap.pipe(
      mergeMap((params: ParamMap) =>
        this.testService.getMarksForSpecifiedTest(params.get('id'))))).subscribe(([test, marks]: [TestModel[], MarkModel[]]) => {
      if (!!marks[0]) {
        this.marks = cloneDeep(marks);
        this.test = cloneDeep(test[0]);
      }
    });
  }

  public getAnswerValue(question: QuestionModel, answerId: string): string {
    return question.answers.find(answer => answer.id = answerId).value;
  }

  getUserName(name: NameModel) {
    return NameModel.buildNameLabel(name);
  }

  public openModal(targetModal: TemplateRef<any>, imageUrl: string, modalTitle: string) {
    this.modalService.open(targetModal, {
      centered: true,
      backdrop: 'static',
      size: 'lg'
    });
    this.modalImageUrl = imageUrl;
    this.modalTitle = modalTitle;
  }
}
