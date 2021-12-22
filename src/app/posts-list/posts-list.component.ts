import { Component, OnInit } from '@angular/core';
import { PostService } from './../post.service';
import { UserService } from './../user.service';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css']
})
export class PostsListComponent implements OnInit {

  constructor(public postService:PostService,public userService:UserService) { }

  ngOnInit(): void {
    this.userService.getPosts().subscribe(data=>console.log(data))
    this.postService.getPosts().subscribe(data=>console.log(data))
   // this.userService.getRoles().subscribe(data=>console.log(data))
    // this.userService.getPositions()
  }

}
