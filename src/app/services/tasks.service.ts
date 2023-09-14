import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from '../model/task';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  tasks$: BehaviorSubject<Task> =  new  BehaviorSubject<Task>({id: '', name: '', description:'', completed: false});

  constructor() { }

  addTask(newTask: Task) {
      this.tasks$.next(newTask);
  }

  getTasks() {
    return this.tasks$.asObservable();
  }
}
