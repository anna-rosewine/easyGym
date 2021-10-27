import { Component, OnInit } from '@angular/core';
import { AuthFacade } from '@pet/auth/feature';
import { AuthInfo, User } from '../../../../feature/src/lib/+state/auth/auth.interfaces';
import { Router } from '@angular/router';
import { AuthService } from '../../../../feature/src/lib/+state/auth/auth.service';
import { catchError, map } from 'rxjs/operators';

@Component({
  selector: 'pet-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: string ;
  password: string ;
  constructor(private authFacade: AuthFacade, private router: Router,  private authService: AuthService) {
    this.router.routeReuseStrategy.shouldReuseRoute = function() {
      return false;
    };
    this.email = '';
    this.password = '';
  }

  authWithGoogle(){
    this.authFacade.authWithGoogle()
  }

  login(){
    const authInfo: AuthInfo = {
      mail: this.email,
      password: this.password
    }
    this.authFacade.clearLogout()
    // this.authFacade.signUp(authInfo)
    this.authFacade.login(authInfo)
    this.password = ''
    this.email = ''
    setTimeout(()=>{
      this.router.navigate([`/profile`]).then()
    }, 500)
    this.authFacade.user$.subscribe((data) => {
      if(data){
        this.router.navigate([`/profile`]).then()
      }
    })

  }

  ngOnInit(): void {

  }

}
