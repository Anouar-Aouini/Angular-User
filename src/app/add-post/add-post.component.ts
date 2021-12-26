import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PostService } from './../post.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent implements OnInit {
  public param: { id: number} = { id: 0 }
  constructor(public route : ActivatedRoute,public postService : PostService) { }

  ngOnInit(): void {
      this.param = {
      id: this.route.snapshot.params["id"],
      }
  }
  addPost(postForm: NgForm) {
    let post = postForm.value;
    post.published = true;
    this.postService.addPost(this.param.id, post).subscribe();
    postForm.resetForm();
  }

}
