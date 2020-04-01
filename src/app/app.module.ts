import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import {FormsModule} from '@angular/forms';
import { ViewTestComponent } from './components/view-test/view-test.component';
import { CreateTestComponent } from './components/create-test/create-test.component';
import { RankingComponent } from './components/ranking/ranking.component';
import { AccessTestComponent } from './components/access-test/access-test.component';
import {RouterModule} from '@angular/router';
import {appRoutes} from './app.routes';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { SplitCreateAccessComponent } from './components/split-create-access/split-create-access.component';
import { SingleStringPipe } from './pipes/single-string/single-string.pipe';
import { NgbdSortableHeaderDirective } from './components/ranking/help/directives/sortable.directive';

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
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgbModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    RouterModule.forRoot(
      appRoutes,
      // TODO REMOVE
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
