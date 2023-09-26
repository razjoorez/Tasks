import { Component } from '@angular/core';
import { TasksService } from './services/tasks.service';
import { Observable } from 'rxjs';
import { Task } from './model/task';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'tasks';
  tasks$!: Observable<Task[]>;
  constructor(private taskService: TasksService) {
    this.taskService.tasks$.subscribe((tasks)=> {
      console.log('tasks:' , tasks)
    })
  }

  addBtn(name: string, description: string){
    // name= 'angular';
    // description = 'do angular lazy loading';
    this.taskService.addTask(name,description);
    this.tasks$ = this.taskService.getTasks();
  } 
}
