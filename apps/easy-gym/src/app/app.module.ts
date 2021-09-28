import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent,
   ],
  imports: [BrowserModule, AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
