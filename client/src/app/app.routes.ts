import { Routes } from '@angular/router';
import {HomeComponent} from "./home/home/home.component";
import {StudentsComponent} from "./students/students/students.component";
import {GroupsComponent} from "./groups/groups.component";

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'students', component: StudentsComponent },
  { path: 'groups', component: GroupsComponent },
  { path: '**', redirectTo: '/home' }
];
