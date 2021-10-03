// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyCEzWtpJutwLfZSmZyUJTolEHukOwuACHU",
    authDomain: "easygym-7a9c2.firebaseapp.com",
    databaseURL: "https://easygym-7a9c2-default-rtdb.firebaseio.com",
    projectId: "easygym-7a9c2",
    storageBucket: "easygym-7a9c2.appspot.com",
    messagingSenderId: "1022533059766",
    appId: "1:1022533059766:web:3eb08053443ad764cd5217",
    measurementId: "G-6N2M1880JF"}
};

// Import the functions you need from the SDKs you need

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional


// Initialize Firebase
const app = initializeApp(environment.firebase);
const analytics = getAnalytics(app);

// 4/1AX4XfWgwwfsekm8vANIjhjbRToI-8Ag-rWMuZSWYBU9oqUeRYWy3IqbTo-I

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
