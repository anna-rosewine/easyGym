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

  login(){
    const authInfo: AuthInfo = {
      mail: this.email,
      password: this.password
    }
    console.log(authInfo)
    this.authFacade.clearLogout()
    // this.authFacade.signUp(authInfo)
    this.authFacade.login(authInfo)
    this.password = ''
    this.email = ''
    setTimeout(()=>{
      this.router.navigate([`/profile`]).then()
    }, 500)

    // this.authService.checkUserForGuard().pipe(
    //   map((user) => {
    //     if(user !== null) {
    //       console.log(user, 'go to profile')
    //       this.router.navigate([`/profile`])
    //     }
    //   }),
    //   catchError(async (err) => {
    //     const locationFromWin = window.location.pathname;
    //     console.log(err)
    //     // this.router.navigate(['/auth/login'])
    //   })
    // );
  }

  ngOnInit(): void {
    this.authFacade.user$.subscribe((data) => {
      if(data){
        this.router.navigate([`/profile`]).then()
      }
    })
    // this.authFacade.loginWasSuccessful.subscribe((data) => {
    //   if(data){
    //     if(data===true){
    //       console.log('go to profile')
    //       this.router.navigate([`/profile`])
    //     }
    //   }
    // })
  }

}
