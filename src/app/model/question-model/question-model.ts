import {AnswerModel} from '../answer-model/answer-model';

export class QuestionModel {
  public id?: number;
  public imageUrl: string;
  public youtubeVideoLink?: string;
  public currentNumber?: number;
  public text: string;
  public answers: AnswerModel[] = [
    new AnswerModel('A', ''),
    new AnswerModel('B', ''),
    new AnswerModel('C', ''),
    new AnswerModel('D', ''),
    new AnswerModel('E', '')
  ];
  public rightAnswer: string;
  public value?: number;

  constructor(currentNumber?: number, id?: number) {
    this.currentNumber = currentNumber;
    this.id = id;
  }
}
