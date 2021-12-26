import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommentService } from '../comment.service';
import { PostService } from '../post.service';
import { Post } from './../posts-list/post.module';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { User } from '../userlist/user.module';

@Component({
  selector: 'app-post-details',
  templateUrl: './post-details.component.html',
  styleUrls: ['./post-details.component.css']
})
export class PostDetailsComponent implements OnInit {
  public commentForm!: FormGroup;
  public param?: { id: number };
  public post?: Post;
  public id: string="";
  public comments: any;
  public users?:User[];
  constructor(private fb: FormBuilder,
    public route: ActivatedRoute,
    public postService: PostService,
    public commentService: CommentService,
    public userService : UserService) { }

  ngOnInit(): void {
        this.commentForm = this.fb.group({
      text: ["", [Validators.required]],
      });
          this.param = {
          id: this.route.snapshot.params["id"],
          }
    this.postService.getPosts().subscribe(data => {
      this.post = data.filter(el => el.id == this.param?.id)[0];
    })
    this.userService.activeUser().subscribe(data=> this.id = data.id+"" )
    this.commentService.getComments(this.param.id).subscribe(data => {
      this.comments = data.content;
      this.userService.getUsers().subscribe(data => {
        this.users = data;
        console.log(this.id,this.users)
      });
    })

  }
  userName(comment:any) {
    let firstName = this.users?.filter(el => el.id == + comment.user_id)[0].firstName;
    return firstName;
  }
  onSubmitComment() {
    if (this.commentForm.value.text.length > 0) {
      let comment = {text:this.commentForm.value.text,user_id:this.id}
         this.commentService.addComments(this.param!.id, comment)
        this.commentService.getComments(this.param!.id).subscribe(data => {
          this.comments = data.content;
        })
      this.commentForm.reset();
    }


  }
    get text() {
    return this.commentForm.get('text');
    }
  durationTime(){
    let duration = this.post?.createdAt + "";
    return this.duration(duration)
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
