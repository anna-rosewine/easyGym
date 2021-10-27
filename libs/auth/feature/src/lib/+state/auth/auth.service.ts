import { Injectable, NgZone } from '@angular/core';
import firebase from 'firebase/compat/app';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { from, Observable, ObservedValueOf, of } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from './auth.interfaces';
import GoogleAuthProvider = firebase.auth.GoogleAuthProvider;

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
    return from(
      this.afAuth.signInWithEmailAndPassword(email, password)
    )
  }

  GoogleAuth() {
    return this.AuthLogin(new GoogleAuthProvider());
  }

  AuthLogin(provider: any) {
    return from(this.afAuth.signInWithPopup(provider))
  }

  checkUser(){
    return of(this.afAuth.authState)
  }

  checkUserForGuard(){
    return this.afAuth.authState
  }

  emailSignup(email: string, password: string) {
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
