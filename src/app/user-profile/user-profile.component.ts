import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { AngularFireStorageReference, AngularFireUploadTask, AngularFireStorage} from '@angular/fire/compat/storage';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {


  ID:any;
  email:any = '';
  myUid :any;
  itemList: AngularFireList<any>;
  userKey:any;
  itemArray:any[] = [];
  imageURL : any;

  person = {

    fName : '',
    phone:'',
    age:'',
    address:'',
    city:'',
    job:'',
    email:'',
    images:''

  }


 // ref!: AngularFireStorageReference;
  // task!:AngularFireUploadTask;
  uploadPercent!: Observable<Number | undefined>;
  downloadURL!: Observable<string>;




  constructor(private store:AngularFireStorage ,public db:AngularFireDatabase ) {

    this.email = localStorage.getItem('email');
    this.myUid = localStorage.getItem('uid');


      this.itemList = db.list('users');


    this.itemList.snapshotChanges().subscribe(actions=>{
      actions.forEach(action=>{
       let pullData:any = action.payload.toJSON();
       pullData["$key"] = action.key;
      // console.log( "uidData: " ,action.payload.child('myUid').val());
    //  console.log(action.payload.toJSON());

       if (action.payload.child('myUid').val() === this.myUid) {

        this.itemArray.push(pullData as ListItemClass);
        this.userKey = action.key;
        this.person.fName = this.itemArray[0]['fName']
        this.person.phone = this.itemArray[0]['phone']
        this.person.age = this.itemArray[0]['age']
        this.person.address = this.itemArray[0]['address']
        this.person.city = this.itemArray[0]['city']
        this.person.job = this.itemArray[0]['job']
        this.person.email = this.itemArray[0]['email']
        this.person.images = this.itemArray[0]['images'];

        // console.log(this.itemArray[0]);
        // console.log( "userKye" ,this.userKey);
    //    this.data = this.itemArray[0];

       }
     })
   })

 // console.log(this.itemArray);

  }

  onEdit() {

    this.itemList.set(this.userKey, {

      fName : this.person.fName,
      phone : this.person.phone,
      age : this.person.age,
      address : this.person.address,
      job : this.person.job,
      city:this.person.city,
      email:this.email,
      myUid:this.myUid,
      images: this.imageURL


    });

  }
  insertProfile() {

    this.itemList.push( {

      fName : this.person.fName,
      phone : this.person.phone,
      age : this.person.age,
      address : this.person.address,
      job : this.person.job,
      city:this.person.city,
      email:this.email,
      myUid:this.myUid,
      images: this.imageURL


    });

  }


  ngOnInit(): void {

    // console.log("Email: " ,this.email);
    //  console.log("UID: " ,this.myUid);
    //  console.log(this.data);


  }


  upload(event:any) {

    // const id = Math.random().toString(36).substring(2);
    // this.ref = this.store.ref(id);
    // this.task = this.ref.put(event.target.files[0]);

    // const file = event.target.files[0];
    // const id = Math.random().toString(36).substring(2);
    // this.ref = this.store.ref(id);
    // this.task = this.ref.put(file);


    const file = event.target.files[0];
    const id = Math.random().toString(36).substring(2);
    const fileRef = this.store.ref(id);
    const task =  this.store.upload(id, file);

     this.uploadPercent = task.percentageChanges();
     task.snapshotChanges().pipe(
      finalize(() => fileRef.getDownloadURL().subscribe(url =>{

        if (url) {

          this.imageURL = url;
        //  console.log("the url is : " + this.imageURL);


        }else {
          console.log("the url is not avialable");

        }

      }))

      ).subscribe();



   }


}

class ListItemClass {

  $key:string = '';
  fName : string = '';
  phone : string = '';
  age : string = '';
  address : string = '';
  city : string = '';
  job : string = '';
  email:string = '';

}
