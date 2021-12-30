import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../user.service';
import { User } from '../userlist/user.module';
import { UserDetailsService } from './../user-details.service';
import { UserDetails } from './userdetails.module';
import { PostService } from '../post.service';
import { TagService } from '../tag.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public successMessage = {msg:"",showSuccess:false};
  public imgURL: string = "https://i.pravatar.cc/40?img=";
  constructor(public tagService: TagService,
              public postService: PostService,
              private modalService: NgbModal,
              public userService: UserService,
              public userDetailsService:UserDetailsService) { }
  public profileModal = { firstName: "", lastName: "", password: "" };
  public completedProfile: boolean = false;
  public updateProfileModal ={
    age: this.userDetails?.age,
    phoneNumber: this.userDetails?.linkedinProfileLink,
    githubProfileLink:this.userDetails?.githubProfileLink,
    linkedinProfileLink:this.userDetails?.linkedinProfileLink};
  public completeProfileModal = {
    age: "",
    phoneNumber: "",
    dateOfBirth: "",
    address: "",
    githubProfileLink:"",
    linkedinProfileLink:"",
    gender:"MALE"};
  public closeResult = '';
  public userDetails? : UserDetails;
  public user?: User;
  public idUser?: number;
  public myPosts?: number;
  public myTags?:number;
  ngOnInit(): void {
    this.userService.activeUser().subscribe(data => {
      this.user = data;
      this.profileModal = {
        firstName: this.user?.firstName,
        lastName: this.user?.lastName,
        password: ""
      }
    this.idUser = this.user.id;
    this.userDetailsService.getUserDetails().subscribe(data => {
    this.userDetails = data.filter(el => el.user?.id == this.idUser)[0];
    this.updateProfileModal ={
    age: this.userDetails?.age,
    phoneNumber: this.userDetails?.phoneNumber,
    githubProfileLink:this.userDetails?.githubProfileLink,
    linkedinProfileLink: this.userDetails?.linkedinProfileLink
    };
    })
    this.tagService.getTags().subscribe(data => {
    this.myTags = data.filter(el => +el.user_id == this.idUser).length;
    })
    this.postService.getPosts().subscribe(data => {
    this.myPosts = data.filter(el => el.user.id == this.idUser).length;
    })
    });
  }
  onSubmitComplete() {
    this.userDetailsService.userDetailsProfile(this.completeProfileModal).subscribe(data => {
      this.userDetailsService.affectUserToDetails(this.user!.id, data.id).subscribe(data => {
        this.userDetails = data.userDetails;
        this.updateProfileModal ={
        age: this.userDetails?.age,
        phoneNumber: this.userDetails?.phoneNumber,
        githubProfileLink:this.userDetails?.githubProfileLink,
        linkedinProfileLink: this.userDetails?.linkedinProfileLink
        };
        this.successMessage = { msg :"User details successfully added!", showSuccess: true }
        setTimeout(() => this.successMessage={ msg:"", showSuccess: false }, 3000)
      });
    });
  }
  onSubmitUpdate() {
    this.userService.updateUser(this.profileModal, this.user!.id).subscribe(data => {
      this.user = data.user;
      this.successMessage = { msg :"User profile successfully updated!", showSuccess: true }
      setTimeout(() => this.successMessage={ msg:"", showSuccess: false }, 3000)
    })
  }
  onSubmitUpdateDetails() {
    this.userDetailsService.updateUserDetails(this.userDetails!.id, this.updateProfileModal).subscribe(data => {
      this.userDetails = data.userDetails;
      this.successMessage = { msg :"User details successfully updated!", showSuccess: true }
      setTimeout(() => this.successMessage={ msg:"", showSuccess: false }, 3000)
    })
  }

  open(content:any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
