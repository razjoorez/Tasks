import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TasksService } from '../services/tasks.service';


@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent {
  addTaksForm!: FormGroup;
  

  constructor(private fb: FormBuilder,
    private taskService: TasksService,
    public dialogRef:
    MatDialogRef<TaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any)
    {
    this.addTaksForm = this.fb.group({
      name:'',
      description: ''
    })
    

  }

  save() {
    if(this.addTaksForm.valid) {
      console.log(this.addTaksForm.value);
      console.log('save');
      this.dialogRef.close();
      this.taskService.addTask(this.addTaksForm.controls['name'].value, this.addTaksForm.controls['description'].value);
    }

    this.dialogRef.close();

  }
  close() {
    this.dialogRef.close();
  }

}
