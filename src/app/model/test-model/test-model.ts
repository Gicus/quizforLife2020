import {QuestionModel} from '../question-model/question-model';
import {MarkModel} from '../mark-model/mark-model';
import {NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

export class TestModel {
  public id: string;
  public youtubeVideoLink: string;
  public questions: QuestionModel[] = [];
  public totalValue: number;
  public marks: MarkModel[] = [new MarkModel()];
  public dueDate: NgbDateStruct;

  public calculateTotalValue() {
    let totalValue = 0;
    this.questions.forEach(question => totalValue += question.value);
    this.totalValue = totalValue;
  }
}
