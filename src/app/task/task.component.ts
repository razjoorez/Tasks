import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent {
  addTaksForm!: FormGroup;

  constructor(private fb: FormBuilder){
    this.addTaksForm = this.fb.group({
      name:'',
      description: ''
    })

  }

  save() {
    if(this.addTaksForm.valid) {
      console.log(this.addTaksForm.value);
      console.log('save');
    }

  }

}
