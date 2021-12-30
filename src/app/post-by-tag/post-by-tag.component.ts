import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../post.service';
import { Post } from '../posts-list/post.module';
import { TagService } from '../tag.service';
import { UserService } from '../user.service';
import { User } from '../userlist/user.module';

@Component({
  selector: 'app-post-by-tag',
  templateUrl: './post-by-tag.component.html',
  styleUrls: ['./post-by-tag.component.css']
})
export class PostByTagComponent implements OnInit {
  public posts?: Post[];
  public user?: User;
  public email?: String;
  public date?: Date;
  public timestamp?: string;
  public imgURL: string = "https://i.pravatar.cc/40?img=";
  public param: { id: number} = { id: 0 }
  constructor(public postService:PostService,public userService:UserService,public route:ActivatedRoute,public tagService : TagService) { }

  ngOnInit(): void {
    this.date = new Date("milliseconds")
    this.userService.current().subscribe(data=>this.email=data.message)
    this.userService.getUsers().subscribe(data => this.user = data.filter((el)=>el.email===this.email)[0]);
      this.param = {
      id: this.route.snapshot.params["id"],
      }
    this.tagService.getTagsById(this.param.id).subscribe(data => {
      this.posts = data.posts;
    })
   // this.userService.getRoles().subscribe(data=>console.log(data))
    // this.userService.getPositions()
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
