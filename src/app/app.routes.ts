import {Routes} from '@angular/router';
import {CreateTestComponent} from './components/create-test/create-test.component';
import {ViewTestComponent} from './components/view-test/view-test.component';
import {RankingComponent} from './components/ranking/ranking.component';
import {AccessTestComponent} from './components/access-test/access-test.component';
import {SplitCreateAccessComponent} from './components/split-create-access/split-create-access.component';
import {ValidationTestComponent} from './components/validation-test/validation-test.component';

export const appRoutes: Routes = [
  {path: 'create-test', component: CreateTestComponent},
  {path: 'view-test/:id', component: ViewTestComponent},
  {path: 'validation-test', component: ValidationTestComponent},
  {path: 'ranking/:id', component: RankingComponent},
  {path: '', component: SplitCreateAccessComponent},
  {path: 'access-test', component: AccessTestComponent},
  {path: '**', component: SplitCreateAccessComponent}
];
