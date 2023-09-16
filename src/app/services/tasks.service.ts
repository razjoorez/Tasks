import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from '../model/task';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  tasks$: BehaviorSubject<Task[]> =  new  BehaviorSubject<Task[]>([]);

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

  getTasks() {
    return this.tasks$.asObservable();
  }
}


