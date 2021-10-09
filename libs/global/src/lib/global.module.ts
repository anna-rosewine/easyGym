import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedUiModule } from '@pet/shared/ui';
import { WorkoutsFeatureModule, WorkoutStateFacade } from '@pet/workouts/feature';
import { StoreRouterConnectingModule} from '@ngrx/router-store';

const routes: Routes = [
  {
    path: '', pathMatch: 'full', component: ProfileComponent
  },
  {
    path: 'home', pathMatch: 'full', component: ProfileComponent
  },
];

@NgModule({
  imports: [CommonModule,
    StoreRouterConnectingModule.forRoot({}),
    RouterModule.forChild(routes),
    WorkoutsFeatureModule,
    SharedUiModule],
  declarations: [
    ProfileComponent
  ],
  providers: [],
  exports: [ProfileComponent]
})
export class GlobalModule {}
