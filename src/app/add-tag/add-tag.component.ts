import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TagService } from '../tag.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-tag',
  templateUrl: './add-tag.component.html',
  styleUrls: ['./add-tag.component.css']
})
export class AddTagComponent implements OnInit {
  public successMessage = {msg:"",showSuccess:false};
  public param: { id: number }={ id: 0 };
  constructor(public tagService: TagService, public route: ActivatedRoute) { }

  ngOnInit(): void {
  this.param = {
  id: this.route.snapshot.params["id"],
  }
  }

  addTag(postForm: NgForm) {
    let name = postForm.value;
    name.user_id = +this.param.id;
    this.tagService.addTag(name).subscribe(() => {
      this.successMessage = { msg :"Tag successfully added!", showSuccess: true }
      setTimeout(() => this.successMessage={ msg:"", showSuccess: false }, 3000)
    });
    postForm.resetForm();
  }
}
