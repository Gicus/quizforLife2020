import {NameModel} from '../name-model/name-model';

export class UserModel {
  public name: NameModel = new NameModel();
  public email: string;
}
