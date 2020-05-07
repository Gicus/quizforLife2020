import {QuestionModel} from '../question-model/question-model';
import {MarkModel} from '../mark-model/mark-model';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import {UserModel} from '../user-model/user-model';

export class TestModel {
  public id: string;
  public youtubeVideoLink: string;
  public questions: QuestionModel[] = [];
  public totalValue: number;
  public creator: UserModel = new UserModel();
  public marks: MarkModel[] = [new MarkModel()];
  public dueDate: NgbDateStruct;

  public calculateTotalValue() {
    let totalValue = 0;
    this.questions.forEach(question => totalValue += question.value);
    this.totalValue = totalValue;
  }
}
