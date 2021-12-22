import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Position } from '../addposition/position.module';
import { UserService } from './../user.service';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.component.html',
  styleUrls: ['./adduser.component.css']
})
export class AdduserComponent implements OnInit {
  public positions?: Position[];
  constructor(private fb: FormBuilder,public userService : UserService) { }
  public registerForm!: FormGroup;
  public role: string = "Candidate";
  public errorMessage = {msg:"",show:false};
  ngOnInit(): void {
   // this.userService.getPositions().subscribe(data => this.positions=data);
      this.registerForm = this.fb.group({
      firstName: ["", [Validators.required]],
      lastName: ["", [Validators.required]],
      password: ["", [Validators.required, Validators.minLength(6)]],
      email: ["",[ Validators.required, Validators.email]],
      position: [{p_id:0}, Validators.required],
      account: [, Validators.required]
      });
  }
  defaultPosition: string = "default";
  positionHasError = true;
  validateposition(value:string) {
    value === "default" ? this.positionHasError = true : this.positionHasError = false;
  }

  get firstName() {
    return this.registerForm.get('firstName');
  }

  get lastName() {
    return this.registerForm.get('lastName');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get position() {
    return this.registerForm.get('position');
  }

  get account() {
    return this.registerForm.get('account');
  }

  onSubmitRegister() {
    this.registerForm.value.position.p_id = + this.defaultPosition;
    let user = { ...this.registerForm.value, account: { password: this.registerForm.value.account } };
    this.userService.addUser(user);
  }
}
