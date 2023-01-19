import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {


ID:any;
itemList: AngularFireList<any> ;
itemArray:any[] = [];

user = {
  fName : '',
  phone : '',
  skill : '',
  province :'',
  price : '',
  notes : '',
  email:''
}

  constructor(private route:ActivatedRoute, public db:AngularFireDatabase) {

         this.route.params.subscribe(params =>{

          this.ID = params

         });

    this.itemList = db.list('skills');
    this.itemList.snapshotChanges().subscribe(actions=>{
      actions.forEach(action=>{
       let pullData:any = action.payload.toJSON();
       pullData["$key"] = action.key;
       //console.log(action.key);
       if (action.key === this.ID['id']) {
        this.itemArray.push(pullData as ListItemClass);

        this.user.fName = this.itemArray[0]['fName']
        this.user.phone = this.itemArray[0]['phone']
        this.user.skill = this.itemArray[0]['skill']
        this.user.province = this.itemArray[0]['province']
        this.user.price = this.itemArray[0]['price']
        this.user.notes = this.itemArray[0]['notes']
        this.user.email = this.itemArray[0]['email']

        // console.log(this.itemArray[0]['province']);

       }

     })
   })


//  this.myUid = localStorage.getItem('uid');
  // console.log(this.itemArray);



   }

  ngOnInit(): void {

    // console.log("ID: " ,this.ID['id']);
    // console.log("User: ", this.user);

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
  email:string = '';

}
