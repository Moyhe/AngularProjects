import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { getAuth } from 'firebase/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private fire:AngularFireAuth, private route:Router) { 


  }
  person : any = {
    
    email: '',
    password:''
 
}

uid:any;


  async myLogin(email:string, password:string) {

    const auth:any = getAuth();

  await this.fire.signInWithEmailAndPassword(email, password).then(user=> {
    console.log(email, password);
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('email', auth.currentUser?.email);

    this.fire.authState.subscribe((auth)=>{
      if (auth) {
       localStorage.setItem('uid', auth.uid);
        
      }else return;
    })
    this.route.navigate(['my-skills']);
  }).catch(error=>{
    console.error(error);
  
  });

  }
  
  ngOnInit(): void {
  }

}
