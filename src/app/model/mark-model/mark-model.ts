import {UserModel} from '../user-model/user-model';
import {AnswerModel} from '../answer-model/answer-model';

export class MarkModel {
  testId: string;
  answers?: AnswerModel[] = [];
  user: UserModel;
  value = 0;
}
