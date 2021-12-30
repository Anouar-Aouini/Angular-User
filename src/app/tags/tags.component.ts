import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { TagService } from './../tag.service';
import { User } from './../userlist/user.module';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {
  public successMessage = {msg:"",showSuccess:false};
  public imgURL: string = "https://i.pravatar.cc/40?img=";
  public tags: any = [];
  public activeUser?: User;
  constructor(public tagService : TagService,public route:ActivatedRoute,public router:Router,public userService : UserService) { }

  ngOnInit(): void {

    this.tagService.getTags().subscribe(data => {
      this.tags = data;
    })
    this.userService.activeUser().subscribe(data=> {
      this.activeUser = data;
    })

  }
  getPostsByTag(tag:any) {
    this.router.navigate([tag.name,{id:tag.id}],{relativeTo:this.route});
  }
  addPost(tag:any) {
     this.router.navigate(["addpost",tag.name,{id:tag.id}],{relativeTo:this.route})
  }
  addTag() {
    this.router.navigate(["add/tag",{id:this.activeUser?.id}],{relativeTo:this.route})
  }
  deleteTag(tag: any) {
    this.tagService.deleteTag(tag.id).subscribe(data => {
      this.tags = data;
      this.successMessage = { msg :"Tag successfully deleted!", showSuccess: true }
      setTimeout(() => this.successMessage={ msg:"", showSuccess: false }, 3000)
    });
  }

}
