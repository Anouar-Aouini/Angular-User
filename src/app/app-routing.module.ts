import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddpositionComponent } from './addposition/addposition.component';
import { AdduserComponent } from './adduser/adduser.component';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PostsListComponent } from './posts-list/posts-list.component';
import { RegisterComponent } from './register/register.component';
import { UserlistComponent } from './userlist/userlist.component';

const routes: Routes = [
  { path: "", redirectTo: "/register", pathMatch: "full" },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'auth', component: NavbarComponent,canActivate: [AuthGuard], children: [
  { path: "list", component: UserlistComponent },
  { path: "add", component: AdduserComponent },
  { path: "addposition", component: AddpositionComponent },
  { path: "posts", component: PostsListComponent }
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
