import {Injectable} from '@angular/core';
import {TestModel} from '../model/test-model/test-model';
import {AngularFireDatabase} from '@angular/fire/database';
import {database} from 'firebase';
import {Observable} from 'rxjs';
import {MarkModel} from '../model/mark-model/mark-model';
import {AngularFireStorage} from '@angular/fire/storage';
import UploadMetadata = firebase.storage.UploadMetadata;
import UploadTaskSnapshot = firebase.storage.UploadTaskSnapshot;
import {finalize} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private db: AngularFireDatabase, private storage: AngularFireStorage) {
  }

  public getTest(id: string): Observable<any> {
    return this.db.list('tests', (ref) => ref.orderByChild('id').equalTo(id).limitToFirst(1)).valueChanges();
  }

  public getAllTestsIds(): Observable<any[]> {
    return this.db.list('testsIds').valueChanges();
  }

  public getTestsByCreator(creatorEmail: string): Observable<any> {
    return this.db.list('tests', (ref) => ref.orderByChild('creator/email').equalTo(creatorEmail)).valueChanges();
  }

  public getMyMarks(userEmail: string): Observable<any> {
    return this.db.list('marks', (ref) => ref.orderByChild('user/email').equalTo(userEmail)).valueChanges();
  }

  public uploadPhoto(filePath: string, selectedImage?: UploadMetadata): Observable<string | UploadTaskSnapshot> {
    return this.storage.upload(filePath, selectedImage).snapshotChanges().pipe(finalize(() => {}));
  }

  public getDownloadUrl(filePath: string): Observable<string> {
    return this.storage.ref(filePath).getDownloadURL();
  }

  public postTest(testModel: TestModel): database.ThenableReference {
    this.db.list('testsIds').push(testModel.id);
    return this.db.list('tests').push(testModel);
  }

  public postMark(mark: MarkModel): database.ThenableReference {
    return this.db.list('marks').push(mark);
  }

  public getMarksForSpecifiedTest(id: string): Observable<any> {
    return this.db.list('marks', (ref) => ref.orderByChild('testId').equalTo(id)).valueChanges();
  }

}
