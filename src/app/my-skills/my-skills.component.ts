import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-skills',
  templateUrl: './my-skills.component.html',
  styleUrls: ['./my-skills.component.css']
})
export class MySkillsComponent implements OnInit {



  user = {
    fName : '',
    phone : '',
    skill : '',
    province :'',
    price : '',
    notes : ''
}

myUid:any;


editForm($key:any) {

  for (let value of this.itemArray) {
    
    if (value['$key'] == $key) {
      console.log(value['$key']);
      this.user.fName = value['fName'];
      this.user.phone = value['phone'];
      this.user.skill = value['skill'];
      this.user.province = value['province'];
      this.user.price = value['price'],
      this.user.notes = value['notes'];
  
    }
  }
}

  itemList: AngularFireList<any>;

  itemArray:any[] = [];

  constructor(public db:AngularFireDatabase, public route:Router) { 

    this.itemList = db.list('skills');
     this.itemList.snapshotChanges().subscribe(actions=>{
       actions.forEach(action=>{
        let pullData:any = action.payload.toJSON();
        pullData["$key"] = action.key;
        this.itemArray.push(pullData as ListItemClass);

      })
    })


   this.myUid = localStorage.getItem('uid');
   console.log(this.itemArray);

  }

  onEdit($key:any) {

 // console.log("Editing");
  
  this.itemList.set($key, {

    
    fName : this.user.fName,
    phone : this.user.phone,
    skill : this.user.skill,
    province : this.user.province,
    price : this.user.price,
    notes : this.user.notes

  });

  this.itemArray = [];
  

  // console.log("key :" + $key, " fName :" + this.user.fName, " phone :" 
  // + this.user.phone, " skill :" + this.user.skill, " province : " + this.user.province, " price : "
  //  + this.user.price, " notes : " + this.user.notes);

  }

  onDelete($key:any) {

console.log("Deleting");

this.itemList.remove($key);
this.itemArray = [];

  }

  ngOnInit(): void {
  }

}

 class ListItemClass {

  $key:string = '';
  fName : string = '';
  phone : string = '';
  skill : string = '';
  province : string = '';
  price : string = '';
  notes : string = '';

}




