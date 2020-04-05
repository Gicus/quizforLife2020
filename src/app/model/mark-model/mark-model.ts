import {UserModel} from '../user-model/user-model';

export class MarkModel {
  testId: string;
  answers?: string[] = [];
  user: UserModel;
  value = 0;
}
