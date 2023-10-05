import { AfterViewInit, Component , OnChanges, SimpleChanges, ViewChild} from '@angular/core';
import { TasksService } from '../services/tasks.service';
import { Observable, startWith, map } from 'rxjs';
import { Task } from '../model/task';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { EditTaskComponent } from '../edit-task/edit-task.component';
import { FormControl } from '@angular/forms';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}


@Component({
  selector: 'app-all-tasks',
  templateUrl: './all-tasks.component.html',
  styleUrls: ['./all-tasks.component.scss']
})
export class AllTasksComponent implements AfterViewInit, OnChanges {
  displayedColumns: string[] = ['name', 'description', 'Action'];
  searchControl : FormControl = new FormControl('')
  tasks$!: Observable<Task[]>;
  tasks!:Task[];
  dataSource! :MatTableDataSource<Task>;
  filteredTasks!: Observable<Task[]> ;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;  
  }

  constructor(private taskService: TasksService,
              private dialog: MatDialog) {
  
    this.getFilteredValues();
    
    this.taskService.tasks$.subscribe((tasks) => {
      this.tasks = tasks;
      this.dataSource = new MatTableDataSource<Task>(this.tasks)
    });

  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
  }

  openEditDialog(task: Task) {
    this.dialog.open(EditTaskComponent, {data:{id:task.id, name: task.name, description:task.description}});
  }
  deleteTask(task: Task) {
    this.taskService.deleteTask(task.id);
   this.getFilteredValues();
  
  }

  private _filter(value: string): Task[]{
    const filterVal = value.toLocaleLowerCase();
    return this.tasks.filter(val => val.name.toLocaleLowerCase().includes(filterVal));
  }

  taskClicked(task: Task){
    if(task==null){
      this.dataSource = new MatTableDataSource<Task>(this.tasks)
    }else {
      let taskSelected: Task[] = [];
      taskSelected.push(task);
       this.dataSource = new MatTableDataSource<Task>(taskSelected)
    }
   
  }

  getFilteredValues() {
    this.filteredTasks = this.searchControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || ''))
    );
  }
}
