export class AnswerModel {
  public id: string;
  public value = 'image';
  public imageUrl: string;
  public selectedImage: any;
  public filePath: string;

  constructor(id?, value?) {
    this.id = id;
    this.value = value;
  }
}
