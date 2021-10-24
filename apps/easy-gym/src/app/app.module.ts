import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from '../environments/environment';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { ReactiveFormsModule } from '@angular/forms';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { AuthenticationGuard } from '../../../../libs/auth/feature/src/lib/auth.guard';
import { AuthFeatureModule } from '@pet/auth/feature';


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('@pet/global').then(m => m.GlobalModule),
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'profile',
    loadChildren: () => import('@pet/global').then(m => m.GlobalModule),
    canActivate: [AuthenticationGuard]
  },
  {
    path: 'auth',
    loadChildren: () => import('@pet/auth/ui').then(m => m.AuthUiModule)
  },
  {
    path: 'process',
    loadChildren: () => import('@pet/process-of-workout/ui').then(m => m.ProcessOfWorkoutUiModule),
    canActivate: [AuthenticationGuard]

  },
  {
    path: 'workout',
    loadChildren: () => import('@pet/workouts/ui').then(m => m.WorkoutsUiModule),
    canActivate: [AuthenticationGuard]

  },
];

@NgModule({
  declarations: [AppComponent,
   ],
  imports: [BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AuthFeatureModule,
    ReactiveFormsModule,
    NgMultiSelectDropDownModule.forRoot(),
    StoreModule.forRoot(
      {},
      {
        metaReducers: !environment.production ? [] : [],
        runtimeChecks: {
          strictActionImmutability: true,
          strictStateImmutability: true,
        },
      }
    ),
    EffectsModule.forRoot([]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreRouterConnectingModule.forRoot(),
    RouterModule.forRoot(routes)],
  providers: [AuthenticationGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
