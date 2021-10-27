import { Component, OnInit } from '@angular/core';
import { AuthFacade } from '@pet/auth/feature';
import { AuthInfo } from '../../../../feature/src/lib/+state/auth/auth.interfaces';

@Component({
  selector: 'pet-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  email: string ;
  password: string ;
  message: boolean | undefined;
  constructor(private authFacade: AuthFacade) {
    this.email = '';
    this.password = '';

  }

  signUp(){
    const authInfo: AuthInfo = {
      mail: this.email,
      password: this.password
    }
    this.authFacade.signUp(authInfo)

    // this.authFacade.login(authInfo)
    this.password = ''
    this.email = ''
  }

  authWithGoogle(){
    this.authFacade.authWithGoogle()
  }

  ngOnInit(): void {
    this.authFacade.signUpWasSuccessful.subscribe((data) => {
      if(data === true){
        this.message = true
      }
    })
  }

}
