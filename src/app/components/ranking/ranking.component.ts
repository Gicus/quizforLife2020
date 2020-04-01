import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {mergeMap } from 'rxjs/operators';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {TestService} from '../../services/test/test.service';
import {MarkModel} from '../../model/mark-model/mark-model';
import {Subscription} from 'rxjs';
import {cloneDeep, propertyOf} from 'lodash';
import {NgbdSortableHeaderDirective, SortEvent} from './help/directives/sortable.directive';

const compare = (v1: string, v2: string) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.css']
})
export class RankingComponent implements OnInit {

  public marks: MarkModel[] = [];
  public sortableMarks: MarkModel[] = [];
  private marks$: Subscription;

  constructor(private route: ActivatedRoute, private testService: TestService) {
  }

  @ViewChildren(NgbdSortableHeaderDirective) headers: QueryList<NgbdSortableHeaderDirective>;

  ngOnInit() {
    this.marks$ = this.route.paramMap.pipe(
      mergeMap((params: ParamMap) =>
        this.testService.getMarksForSpeciedTest(params.get('id')))).subscribe(marks => {
      this.marks = cloneDeep(marks);
      this.sortableMarks = cloneDeep(marks);
      console.log(marks);
    });
  }

  onSort({column, direction}: SortEvent) {

    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    // sorting countries
    if (direction === '' || column === '') {
      this.sortableMarks = this.marks;
    } else {
      this.sortableMarks = this.marks.sort((a, b) => {
        const res = compare(`${propertyOf(a)(column)}`, `${propertyOf(b)(column)}`);
        return direction === 'asc' ? res : -res;
      });
    }
  }
}
