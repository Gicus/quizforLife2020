import {Routes} from '@angular/router';
import {CreateTestComponent} from './components/create-test/create-test.component';
import {ViewTestComponent} from './components/view-test/view-test.component';
import {RankingComponent} from './components/ranking/ranking.component';
import {AccessTestComponent} from './components/access-test/access-test.component';
import {SplitCreateAccessComponent} from './components/split-create-access/split-create-access.component';
import {ValidationTestComponent} from './components/validation-test/validation-test.component';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {DashboardComponent} from './components/dashboard/dashboard/dashboard.component';
import {AuthenticationGuard} from './guards/auth/authentication.guard';
import {ResetPasswordComponent} from './components/reset-password/reset-password.component';
import {DashboardMyMarksComponent} from './components/dashboard-my-marks/dashboard-my-marks.component';
import {DashboardTestsCreatedByMeComponent} from './components/dashboard-tests-created-by-me/dashboard-tests-created-by-me.component';

export const appRoutes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'reset-password', component: ResetPasswordComponent},
  {
    path: 'dashboard', component: DashboardComponent, canActivate: [AuthenticationGuard], canActivateChild: [AuthenticationGuard],
    children: [
      {path: '', redirectTo: 'my-tests', pathMatch: 'full'},
      {path: 'my-marks', component: DashboardMyMarksComponent},
      {path: 'my-created-tests', component: DashboardTestsCreatedByMeComponent},
      {path: 'access-test', component: AccessTestComponent},
      {path: 'create-test', component: CreateTestComponent},
      {path: 'view-test/:id', component: ViewTestComponent},
      {path: 'validation-test', component: ValidationTestComponent},
      {path: 'ranking/:id', component: RankingComponent},
    ]
  },
  {path: '', component: SplitCreateAccessComponent, pathMatch: 'full'},
  {path: 'access-test', component: AccessTestComponent},
  {path: 'create-test', component: CreateTestComponent},
  {path: 'view-test/:id', component: ViewTestComponent},
  {path: 'validation-test', component: ValidationTestComponent},
  {path: 'ranking/:id', component: RankingComponent},
  {path: '**', component: SplitCreateAccessComponent}
];
