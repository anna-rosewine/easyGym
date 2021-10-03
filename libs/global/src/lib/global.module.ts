import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile/profile.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedUiModule } from '@pet/shared/ui';

const routes: Routes = [
  {
    path: '', pathMatch: 'full', component: ProfileComponent
  },
];

@NgModule({
  imports: [CommonModule,
    RouterModule.forChild(routes),
    SharedUiModule],
  declarations: [
    ProfileComponent
  ],
  exports: [ProfileComponent]
})
export class GlobalModule {}
