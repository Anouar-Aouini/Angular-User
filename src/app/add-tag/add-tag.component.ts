import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TagService } from '../tag.service';

@Component({
  selector: 'app-add-tag',
  templateUrl: './add-tag.component.html',
  styleUrls: ['./add-tag.component.css']
})
export class AddTagComponent implements OnInit {
  constructor(public tagService : TagService) { }

  ngOnInit(): void {
  }

  addTag(postForm: NgForm) {
    let tag = postForm.value;
    this.tagService.addTag(tag).subscribe(data=>console.log(data));
    postForm.resetForm();
  }
}
