import { Component, OnInit } from '@angular/core';
import { TasksService } from './services/tasks.service';
import { Observable } from 'rxjs';
import { Task } from './model/task';
import { MatDialog } from '@angular/material/dialog';
import { TaskComponent } from './task/task.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'tasks';
  tasks$!: Observable<Task[]>;
  constructor(private taskService: TasksService, 
              private dialog: MatDialog) {
    this.taskService.tasks$.subscribe((tasks)=> {
      console.log('tasks:' , tasks)
    })
    
  }
  ngOnInit(): void {
    this.tasks$ = this.taskService.getTasks();
  }

  addBtn(name: string, description: string){
    
    this.taskService.addTask(name,description);
  } 

  openTaskDialog() {
    this.dialog.open(TaskComponent)
  }

  updateTask() {
    this.taskService.updateTask('1', 'nameee', 'desss') ;
  }
}


  