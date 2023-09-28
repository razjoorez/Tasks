import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from '../model/task';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  initTasks:Task[] = [
    {id: '1',
    name: 'Piano',
    description: 'Practice Chopin Nocturne 30 minutes a day ',
    completed: true  
  },
  {id: '2',
  name: 'Exercise',
  description: 'Walk at least 20 minutes a day',
  completed: true  
},
{id: '3',
name: 'Java',
description: 'Start Java programming ',
completed: true  
}
  ]
  tasks$: BehaviorSubject<Task[]> =  new  BehaviorSubject<Task[]>(this.initTasks);

  constructor() { }

  addTask(name: string, description: string) {
    const newTask:Task = {
      id: Math.random().toString(16),
      name:name,
      description: description,
      completed: false
    }
    const allTasks: Task[] = [...this.tasks$.getValue(), newTask];
    this.tasks$.next(allTasks);

  }

  updateTask(id:string,name: string, description: string) {
      const currentTasks = [...this.tasks$.getValue()];
      const updatedTasks = currentTasks.map(obj=> {
        if(obj.id === id) {
          return { ...obj,name: name, description: description}
        }
        return obj;
      });

      this.tasks$.next(updatedTasks);

  }

  deleteTask(id:string){
    const currentTasks = [...this.tasks$.getValue()];
    const updatedTasks = currentTasks.filter((task)=> {
    return  task.id !=id;
    
    });
    
    this.tasks$.next(updatedTasks);

  }

  getTasks() {
    return this.tasks$;
  }

  filterTask() {

  }
}


