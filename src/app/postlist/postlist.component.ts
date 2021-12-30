import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../post.service';
import { UserService } from '../user.service';
import { Post } from './../posts-list/post.module';
import { User } from './../userlist/user.module';

@Component({
  selector: 'app-postlist',
  templateUrl: './postlist.component.html',
  styleUrls: ['./postlist.component.css']
})
export class PostlistComponent implements OnInit, OnChanges {
  @Input() public search: string = "";
  public successMessage = {msg:"",showSuccess:false};
  public imgURL: string = "https://i.pravatar.cc/40?img=";
  public posts?: Post[];
  public user?: User;
  constructor(public postService:PostService,public userService:UserService,public route : ActivatedRoute, public router : Router) { }

  ngOnInit(): void {
    this.userService.activeUser().subscribe(data => this.user = data);
  }
    ngOnChanges(changes: SimpleChanges): void {
    if (changes.search.currentValue.length > 0) {
          this.postService.getFilteredPosts(changes.search.currentValue).subscribe(data => this.posts=data)
    } else {
      this.postService.getPosts().subscribe(data => {
        this.posts = data;
      });
    }
    }
    showDetails(post:Post) {
    this.router.navigate([post.title,{id:post.id}],{relativeTo:this.route})
  }
  deletePost(postId: number) {
    this.postService.deletePost(postId).subscribe(data => {
      console.log(data.posts)
      this.posts = data.posts;
      this.successMessage = { msg :"Post deleted successfully", showSuccess: true }
        setTimeout(() => this.successMessage={ msg:"", showSuccess: false }, 3000)
    })
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
