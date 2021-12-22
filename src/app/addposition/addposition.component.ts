import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subject } from 'rxjs';
import { UserService } from './../user.service';
import { Position } from './position.module';

@Component({
  selector: 'app-addposition',
  templateUrl: './addposition.component.html',
  styleUrls: ['./addposition.component.css']
})
export class AddpositionComponent implements OnInit {
  error = new Subject<string>();
  public positions?: Position[];
  constructor(public userService : UserService) { }

  ngOnInit(): void {
    //this.userService.getPositions().subscribe(data => this.positions=data);
  }
        onSubmit(positionForm:NgForm){
          this.userService.addPosition({ p_name: positionForm.value.positionName }).subscribe();
         // this.userService.getPositions().subscribe(data => this.positions = data);
          positionForm.resetForm();
     }
}
