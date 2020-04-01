import {Injectable} from '@angular/core';
import {TestModel} from '../../model/test-model/test-model';
import {AngularFireDatabase} from '@angular/fire/database';
import {database} from 'firebase';
import {Observable} from 'rxjs';
import {MarkModel} from '../../model/mark-model/mark-model';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private db: AngularFireDatabase) {
  }

  public getTest(id: string): Observable<any> {
    return this.db.list('tests', (ref) => ref.orderByChild('id').equalTo(id).limitToFirst(1)).valueChanges();
  }

  public getAllTestsIds(): Observable<any[]> {
    return this.db.list('testsIds').valueChanges();
  }

  public postTest(testModel: TestModel): database.ThenableReference {
    this.db.list('testsIds').push(testModel.id);
    return this.db.list('tests').push(testModel);
  }

  public postMark(mark: MarkModel) {
    return this.db.list('marks').push(mark);
  }

  public getMarksForSpeciedTest(id: string): Observable<any> {
    return this.db.list('marks', (ref) => ref.orderByChild('testId').equalTo(id)).valueChanges();
  }

}
