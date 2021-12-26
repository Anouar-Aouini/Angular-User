import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TagService } from './../tag.service';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent implements OnInit {
  public tags:any = [];
  constructor(public tagService : TagService,public route:ActivatedRoute,public router:Router) { }

  ngOnInit(): void {
    this.tagService.getTags().subscribe(data => {
      this.tags = data;
    })
  }
  getPostsByTag(tag:any) {
    this.router.navigate([tag.name,{id:tag.id}],{relativeTo:this.route});
  }
  addPost(tag:any) {
     this.router.navigate(["addpost",tag.name,{id:tag.id}],{relativeTo:this.route})
  }
  addTag() {
    this.router.navigate(["add/tag"],{relativeTo:this.route})
  }
  deleteTag(tag: any) {
    this.tagService.deleteTag(tag.id).subscribe(data=>this.tags=data);
  }

}
