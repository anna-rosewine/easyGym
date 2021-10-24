import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthFeatureModule } from '../../../feature/src';


@NgModule({
  imports: [CommonModule,
    AuthFeatureModule,
    RouterModule.forChild([
    {
      path: 'login', pathMatch: 'full', component: LoginComponent
    },
    {
      path: 'signUp', pathMatch: 'full', component: SignUpComponent
    }

  ]), FormsModule],
  declarations: [
    LoginComponent,
    SignUpComponent
  ],
})
export class AuthUiModule {}
