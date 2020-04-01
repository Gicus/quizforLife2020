import {Injectable} from '@angular/core';
import {NgbCalendar, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor(private calendar: NgbCalendar) {
  }

  public isDateBeforeCurrentDate(date: NgbDateStruct): boolean {
    return this.calendar.getToday().before(date);
  }
}
