import { Injectable, NgZone } from '@angular/core';
import firebase from 'firebase/compat/app';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { from, Observable, ObservedValueOf, of } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from './auth.interfaces';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userData: firebase.User | undefined;
  constructor(   public afs: AngularFirestore,   // Inject Firestore service
                 public afAuth: AngularFireAuth, // Inject Firebase auth service
                 public router: Router,
                 public ngZone: NgZone,
             ) {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
      } else {
      }
    })

  }

  login(email: string, password: string){
    // this.afAuth.signInWithEmailAndPassword(email, password)
    //   .then((result) => {
    //     this.ngZone.run(() => {
    //       if(result.user && result.user.email){
    //         const authUser: User = {
    //           email: result.user.email, uid: result.user.uid
    //         }
    //         this.authFacade.setUser(authUser)
    //       }
    //     });
    //     console.log(result)
    //     // this.SetUserData(result.user);
    //   }).catch((error) => {
    //     window.alert(error.message)
    //   })

    return from(
      this.afAuth.signInWithEmailAndPassword(email, password)
    )
  }

  checkUser(){
    return of(this.afAuth.authState)
  }

  checkUserForGuard(){
    return this.afAuth.authState
  }

  emailSignup(email: string, password: string) {
    // this.afAuth.createUserWithEmailAndPassword(email, password)
    //   .then(value => {
    //     console.log('Sucess', value);
    //     this.router.navigateByUrl('/profile');
    //   })
    //   .catch(error => {
    //     console.log('Something went wrong: ', error);
    //   });
    return of(
      this.afAuth.createUserWithEmailAndPassword(email, password)
    )
  }

  googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.oAuthLogin(provider)
      .then(value => {
          this.router.navigateByUrl('/profile');
      })
      .catch(error => {
        error = 0;
      });
  }

  logout() {
    // this.afAuth.signOut().then(() => {
    //   this.router.navigate(['/auth']);
    // });
    return of( this.afAuth.signOut())
  }

  private oAuthLogin(provider: firebase.auth.AuthProvider) {
    return this.afAuth.signInWithPopup(provider);
  }


}
