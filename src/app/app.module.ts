import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
// import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
 import {AngularFireStorageModule } from '@angular/fire/compat/storage';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { AddSkillsComponent } from './add-skills/add-skills.component';
import { MySkillsComponent } from './my-skills/my-skills.component';
import { AllSkillsComponent } from './all-skills/all-skills.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { DetailsComponent } from './details/details.component';
import { UserProfileComponent } from './user-profile/user-profile.component';


const routes:Routes = [

  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component:HomeComponent},
  { path: 'add-skills',  component:AddSkillsComponent},
  { path: 'login',  component:LoginComponent},
  { path: 'register',  component:RegisterComponent},
  { path: 'my-skills',  component:MySkillsComponent},
  { path: 'all-skills',  component:AllSkillsComponent},
  { path: 'details/:id',  component:DetailsComponent},
  { path: 'user-profile',  component:UserProfileComponent},

];


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    AddSkillsComponent,
    MySkillsComponent,
    AllSkillsComponent,
    RegisterComponent,
    LoginComponent,
    DetailsComponent,
    UserProfileComponent,
  
    
    
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
  

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
