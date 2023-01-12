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

  // user = {
  //   fName : '',
  //   phone : '',
  //   skill : '',
  //   province :'',
  //   price : '',
  //   notes : '',
  //   email:''
  // }
  

  data = {
   
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
 
  onEdit() {

    this.itemList.set(this.userKey, {
   
      fName : this.data.fName,
      phone : this.data.phone,
      age : this.data.age,
      address : this.data.address,
      job : this.data.job,
      city:this.data.city,
      email:this.email,
      myUid:this.myUid,
     
     
  
    });
  
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
          console.log("the url is : " + this.imageURL);
          
          
        }else {
          console.log("the url is not avialable");
          
        }  
          
      
      }))
                        
      )
    
       .subscribe();

       this.itemList.set(this.userKey, {
   
        images:this.imageURL
        
      });
    

   }

  constructor(private store:AngularFireStorage ,public db:AngularFireDatabase ) { 
 
    this.email = localStorage.getItem('email');
    this.myUid = localStorage.getItem('uid');


    this.itemList = db.list('users');
    this.itemList.snapshotChanges().subscribe(actions=>{
      actions.forEach(action=>{
       let pullData:any = action.payload.toJSON();
       pullData["$key"] = action.key;
      console.log( "uidData: " ,action.payload.child('myUid').val());
    //  console.log(action.payload.toJSON());
      
      
       if (action.payload.child('myUid').val() === this.myUid) {
       
        this.itemArray.push(pullData as ListItemClass);
        this.userKey = action.key;
        this.data.fName = this.itemArray[0]['fName']
        this.data.phone = this.itemArray[0]['phone']
        this.data.age = this.itemArray[0]['age']
        this.data.address = this.itemArray[0]['address']
        this.data.city = this.itemArray[0]['city']
        this.data.job = this.itemArray[0]['job']
        this.data.email = this.itemArray[0]['email']
        this.data.images = this.itemArray[0]['images'];
     
        console.log(this.itemArray[0]);
        console.log( "userKye" ,this.userKey);
    //    this.data = this.itemArray[0];
    
       }
     })
   })

 // console.log(this.itemArray);

  }

  ngOnInit(): void {

    console.log("Email: " ,this.email);
     console.log("UID: " ,this.myUid);
     console.log(this.data);
     
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
