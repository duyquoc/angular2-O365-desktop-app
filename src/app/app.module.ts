import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule }    from '@angular/http';

import { APP_ROUTING } from '../routes/app.routes';
import { AppComponent } from '../app/app.component'
import { AuthService } from "../auth/auth.service";
import { ProfileComponent } from "../profile/profile.component";
import { ElectronService } from "../services/electron.service";
import { ToastComponent } from "../toast/toast.component";
import { HomeComponent } from "../home/home.component";
import { LoginComponent } from "../login/login.component";
import { FilesComponent } from "../files/files.component";
import { ContactsComponent } from "../contacts/contacts.component";
import { GroupsComponent } from "../groups/groups.component";
import { MailsComponent } from "../mails/mails.component";
import { NotesComponent } from "../notes/notes.component";
import { TasksComponent } from "../tasks/tasks.component";
import { TrendingComponent } from "../trending/trending.component";
import { UsersComponent } from "../users/users.component";

@NgModule({
  imports:      [ BrowserModule, HttpModule, APP_ROUTING ],
  declarations: [ 
    AppComponent, ToastComponent, ProfileComponent, HomeComponent, LoginComponent, FilesComponent,
    ContactsComponent, GroupsComponent, MailsComponent, NotesComponent, TasksComponent, TrendingComponent,
    UsersComponent ],
  bootstrap:    [ AppComponent ],
  providers:    [ AuthService, ElectronService, ProfileComponent, ToastComponent ]
})
export class AppModule { }
