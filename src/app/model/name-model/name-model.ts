export class NameModel {
  public firstName: string;
  public lastName: string;

  public static buildNameLabel(nameModel: NameModel): string {
    let name = '';
    if (nameModel && nameModel.firstName && nameModel.lastName) {
      name = nameModel.firstName + ' ' + nameModel.lastName;
    }
    return name;
  }

  public fullName(): string {
    return NameModel.buildNameLabel(this);
  }
}
