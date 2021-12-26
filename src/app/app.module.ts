import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { UserlistComponent } from './userlist/userlist.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { PostsListComponent } from './posts-list/posts-list.component';
import {MatRadioModule} from '@angular/material/radio';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import {MatButtonModule} from '@angular/material/button';
import { ListComponent } from './list/list.component';
import { TagsComponent } from './tags/tags.component';
import { PostByTagComponent } from './post-by-tag/post-by-tag.component';
import { AddPostComponent } from './add-post/add-post.component';
import { MatInputModule } from '@angular/material/input';
import { AddTagComponent } from './add-tag/add-tag.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PostDetailsComponent } from './post-details/post-details.component';
import { AuthInterceptor } from './auth.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    UserlistComponent,
    PostsListComponent,
    RegisterComponent,
    LoginComponent,
    ListComponent,
    TagsComponent,
    PostByTagComponent,
    AddPostComponent,
    AddTagComponent,
    DashboardComponent,
    PageNotFoundComponent,
    PostDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatSidenavModule,
    NoopAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatCardModule,
    HttpClientModule,
    MatRadioModule,
    MatButtonModule,
    MatInputModule,
    NgbModule
  ],
   providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
