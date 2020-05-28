import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AngularFireModule} from '@angular/fire';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {environment} from '../environments/environment';

import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ViewTestComponent} from './components/view-test/view-test.component';
import {CreateTestComponent} from './components/create-test/create-test.component';
import {RankingComponent} from './components/ranking/ranking.component';
import {AccessTestComponent} from './components/access-test/access-test.component';
import {RouterModule} from '@angular/router';
import {appRoutes} from './app.routes';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {SplitCreateAccessComponent} from './components/split-create-access/split-create-access.component';
import {SingleStringPipe} from './pipes/single-string/single-string.pipe';
import {NgbdSortableHeaderDirective} from './components/ranking/help/directives/sortable.directive';
import {ValidationTestComponent} from './components/validation-test/validation-test.component';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {DashboardComponent} from './components/dashboard/dashboard/dashboard.component';
import {AngularFireAuth} from '@angular/fire/auth';
import {SafeStringPipe} from './pipes/safe-string/safe-string.pipe';
import {ResetPasswordComponent} from './components/reset-password/reset-password.component';
import {DashboardMyMarksComponent} from './components/dashboard-my-marks/dashboard-my-marks.component';
import {DashboardTestsCreatedByMeComponent} from './components/dashboard-tests-created-by-me/dashboard-tests-created-by-me.component';
import { HomepageButtonComponent } from './components/homepage-button/homepage-button.component';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';

export function minlengthValidationMessage(err, field) {
  return `Lungime minimă: ${field.templateOptions.minLength} caractere`;
}

@NgModule({
  declarations: [
    AppComponent,
    ViewTestComponent,
    CreateTestComponent,
    RankingComponent,
    AccessTestComponent,
    SplitCreateAccessComponent,
    SingleStringPipe,
    NgbdSortableHeaderDirective,
    ValidationTestComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    SafeStringPipe,
    ResetPasswordComponent,
    DashboardMyMarksComponent,
    DashboardTestsCreatedByMeComponent,
    HomepageButtonComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    RouterModule.forRoot(
      appRoutes,
      // TODO REMOVE
      // {enableTracing: true} // <-- debugging purposes only
    ),
    FormlyModule.forRoot(
      {
        validationMessages: [
          {name: 'required', message: 'Câmp obligatoriu.'},
          {name: 'minlength', message: minlengthValidationMessage}
        ]
      }
    ),
    FormlyBootstrapModule
  ],
  providers: [AngularFireAuth],
  bootstrap: [AppComponent]
})
export class AppModule { }
