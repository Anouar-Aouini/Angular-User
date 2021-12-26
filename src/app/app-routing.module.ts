import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPostComponent } from './add-post/add-post.component';
import { AddTagComponent } from './add-tag/add-tag.component';
import { AuthGuard } from './auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PostByTagComponent } from './post-by-tag/post-by-tag.component';
import { PostDetailsComponent } from './post-details/post-details.component';
import { PostsListComponent } from './posts-list/posts-list.component';
import { RegisterComponent } from './register/register.component';
import { TagsComponent } from './tags/tags.component';
import { UserlistComponent } from './userlist/userlist.component';

const routes: Routes = [
  { path: "", redirectTo: "/register", pathMatch: "full" },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'auth', component: NavbarComponent,canActivate: [AuthGuard], children: [
  { path: "list", component: UserlistComponent },
  { path: "posts", component: PostsListComponent },
  { path: "tags", component: TagsComponent },
  { path: "dashboard", component: DashboardComponent },
  { path: "tags/:id", component: PostByTagComponent },
  { path: "posts/:id", component: PostDetailsComponent },
  { path: "tags/add/tag", component: AddTagComponent },
  { path: "tags/addpost/:id", component: AddPostComponent }
  ]},
  { path: "**" , component : PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
