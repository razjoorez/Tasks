import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
      name:['', Validators.required],
      description: ['',Validators.required]
    })
    

  }

  save() {
    if(this.addTaksForm.valid) {
      this.taskService.addTask(this.addTaksForm.controls['name'].value, this.addTaksForm.controls['description'].value);
      this.dialogRef.close();
      this.dialogRef.afterClosed().subscribe(
        
      )
      
    }
  }
  close() {
    this.dialogRef.close();
  }

}
