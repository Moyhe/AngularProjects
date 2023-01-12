import { Component, OnInit } from '@angular/core';
import { AngularFireAuth, TENANT_ID } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import {  getAuth, onAuthStateChanged } from "firebase/auth";
import { Router } from '@angular/router'
import * as firebase from "firebase/app";

 


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {



 //  user: Observable<firebase.User> | undefined; 
  isLoggedIn:boolean = false;
  private email:string | undefined;

  constructor(public AuthUser:AngularFireAuth, public route:Router) {

        let status = localStorage.getItem('isLoggedIn');
            console.log(status);
        
    if (status === 'true') {
      this.isLoggedIn = true;
    }else {
      this.isLoggedIn = false;
    }
      
  //  this.user = AuthUser.authState;
// const auth = getAuth();

// onAuthStateChanged(auth, (user) => {
//   if (user) {

//     this.isLoggedIn = true;
         //   const uid = user.uid;
       //       console.log(uid);
              
//   } else {
//     this.isLoggedIn = false;
//   }
// });
   }

   logOut() {


    this.AuthUser.signOut();
    this.isLoggedIn = false;
    localStorage.setItem('isLoggedIn', 'false');
    this.route.navigate(['/login']);

   }

  ngOnInit(): void {
  }

}
