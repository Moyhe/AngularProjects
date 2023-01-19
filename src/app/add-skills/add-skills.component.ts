import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth } from 'firebase/auth';

@Component({
  selector: 'app-add-skills',
  templateUrl: './add-skills.component.html',
  styleUrls: ['./add-skills.component.css']
})
export class AddSkillsComponent implements OnInit {


  itemList: AngularFireList<any>;

user = {
    fName : '',
    phone : '',
    skill : '',
    province :'',
    price : '',
    notes : ''

}


email:any = '';
uid:any;

insertSkill() {

  this.itemList.push({

    fName : this.user.fName,
    phone : this.user.phone,
    skill : this.user.skill,
    province : this.user.province,
    price : this.user.price,
    notes : this.user.notes,
    email: this.email,
    uid: this.uid


  });

  this.route.navigate(['/my-skills']);

}


  constructor(private fire:AngularFireAuth,public db:AngularFireDatabase, public route:Router) {

      this.itemList = db.list('skills');


   }

  ngOnInit(): void {


     let person = localStorage.getItem('email');

      // const auth = getAuth();
      // const users = auth.currentUser?.email;
      // console.log(users);

    //let persons = this.fire.currentUser;
     this.email = person
    //  console.log(person);

    this.uid = localStorage.getItem('uid');
    //  console.log(this.uid);



    //  this.fire.authState.subscribe(auth=>{
    //    if (auth) {
    //      this.uid = auth.uid;
    //      console.log("UID :" ,this.uid);

    //    }else return;
    //  })



    //  console.log('---------------------------');
    //  console.log(this.user);

  }


}
