import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../userlist/user.module';
import { PostService } from './../post.service';
import { UserService } from './../user.service';
import { Post } from './post.module';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css']
})
export class PostsListComponent implements OnInit {
  public posts?: Post[];
  public user?: User;
  public email?: String;
  public date?: Date;
  public timestamp?: string;
  public imgURL:string="https://i.pravatar.cc/40?img=";
  constructor(public postService:PostService,public userService:UserService,public route : ActivatedRoute, public router : Router) { }

  ngOnInit(): void {
    this.date = new Date("milliseconds")
    this.userService.current().subscribe(data=>this.email=data.message)
    this.userService.getUsers().subscribe(data => this.user = data.filter((el)=>el.email===this.email)[0]);
    this.postService.getPosts().subscribe(data => {
      this.posts = data;
    })

   // this.userService.getRoles().subscribe(data=>console.log(data))
    // this.userService.getPositions()
  }
  showDetails(post:Post) {
    this.router.navigate([post.title,{id:post.id}],{relativeTo:this.route})
  }

  duration(createdAt: string) {
    let timestamp;
    var result = new Date(createdAt).getTime();
    let now = new Date().getTime()
    let difference = now - result;
  var minutes = Math.floor((difference / (1000 * 60)) % 60),
    hours = Math.floor((difference / (1000 * 60 * 60)) % 24),
    days = Math.floor((difference / (1000 * 60 * 60 * 24)) % 30),
    months = Math.floor((difference / (1000 * 60 * 60 * 24 * 30)) % 12),
    years = Math.floor((difference / (1000 * 60 * 60 * 24 * 365)));
  if (years>0){
     timestamp = `${years} y`;
  }else if(months>0){
     timestamp = `${months} m`;
  } else  if (days>0){
     timestamp = `${days} d`;
  }else if(hours>0){
     timestamp = `${hours} h`;
  } else if(minutes>0) {
     timestamp = `${minutes} min`;
  }else {
     timestamp = "just now"
  }
    return timestamp;
}
}
