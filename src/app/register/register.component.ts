import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  person : any = {
    
    email: '',
    password:''
 
}

async myRegister(email:string, password:string) {

  await this.fire.createUserWithEmailAndPassword(email, password).then(user=> {
    console.log(email, password);
    this.route.navigate(['home']);
  }).catch(error=>{
    console.error(error);
  
  });

  }
  
  constructor(private fire:AngularFireAuth, private route:Router) { }

  ngOnInit(): void {
  }

}
