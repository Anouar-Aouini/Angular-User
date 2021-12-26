import { Component, OnInit } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../user.service';
import { User } from '../userlist/user.module';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public profileModal = { firstName: "", lastName: "", password: "" };
  closeResult = '';
  public email: string = "";
  public user ?: User;
  ngOnInit(): void {
    this.userService.current().subscribe(data => {
      this.email = data.message;
    })
    this.userService.getUsers().subscribe(data => {
      this.user = data.filter(el => el.email === this.email)[0];
      this.profileModal = {
        firstName: this.user?.firstName,
        lastName: this.user?.lastName,
        password:""
      }
    })
  }
  onSubmitUpdate() {
    this.userService.updateUser(this.profileModal, this.user!.id).subscribe(data => {
      this.user = data.user;
    })
  }
  constructor(private modalService: NgbModal,public userService : UserService) {}
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
