import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from '../environments/environment';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('@pet/global').then(m => m.GlobalModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('@pet/global').then(m => m.GlobalModule)
  },
  {
    path: 'workout',
    loadChildren: () => import('@pet/workouts/ui').then(m => m.WorkoutsUiModule)
  },
];

@NgModule({
  declarations: [AppComponent,
   ],
  imports: [BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    RouterModule.forRoot(routes)],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
