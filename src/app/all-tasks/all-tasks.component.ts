import { AfterViewInit, Component , ViewChild} from '@angular/core';
import { TasksService } from '../services/tasks.service';
import { Observable } from 'rxjs';
import { Task } from '../model/task';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { EditTaskComponent } from '../edit-task/edit-task.component';

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
export class AllTasksComponent implements AfterViewInit {
  displayedColumns: string[] = ['name', 'description', 'Action'];
  
  tasks$!: Observable<Task[]>;
  tasks!:Task[];
  dataSource! :MatTableDataSource<Task>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor(private taskService: TasksService,
              private dialog: MatDialog) {
    this.taskService.tasks$.subscribe((tasks) => {
      this.tasks = tasks;
      this.dataSource = new MatTableDataSource<Task>(this.tasks)
    })
  }

  openEditDialog(task: Task) {
    this.dialog.open(EditTaskComponent, {data:{id:task.id, name: task.name, description:task.description}});
  }
  deleteTask(task: Task) {
    this.taskService.deleteTask(task.id);
  
  }
}
