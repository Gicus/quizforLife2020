import {NameModel} from '../name-model/name-model';

export class UserModel {
  public id: number;
  public name: NameModel = new NameModel();
  public email: string;
  public password: string;
  public firstName: string;
  public lastName: string;
  public token: string;
}
