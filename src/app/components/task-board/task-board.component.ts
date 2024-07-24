import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { Task, TaskStatuses } from '../../models/task.model';
import { TaskService } from '../../services/task.service';
import { NgFor, TitleCasePipe } from '@angular/common';
import { TaskListComponent } from '../task-list/task-list.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-task-board',
  standalone: true,
  templateUrl: './task-board.component.html',
  styleUrl: './task-board.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgFor,
    MatButton,
    TitleCasePipe,
    MatInputModule,
    TaskListComponent,
    ReactiveFormsModule,
  ],
})
export class TaskBoardComponent implements OnInit {
  private readonly destroyRef = inject(DestroyRef);
  private readonly taskService = inject(TaskService);

  public tasks: Task[] = [];
  public readonly statuses: TaskStatuses[] = ['new', 'in-progress', 'completed'];
  public readonly taskForm = new FormGroup({
    title: new FormControl<string>('', { nonNullable : true, validators: [Validators.required, Validators.minLength(1)] }),
    description: new FormControl<string>('', { nonNullable : true, validators: [Validators.required, Validators.minLength(1)] }),
    assignedTo: new FormControl<string>('', { nonNullable : true, validators: [Validators.required, Validators.minLength(1)] }),
  });

  ngOnInit(): void {
    this.taskService.getTasks()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(tasks => this.tasks = tasks);
  }

  filteredTasks(status: TaskStatuses): Task[] {
    return this.tasks.filter(task => task.status === status)
  }

  addTask(): void {
    if (this.taskForm.valid) {
      const title = this.taskForm.get('title')?.value ?? '';
      const description = this.taskForm.get('description')?.value ?? '';
      const assignedTo = this.taskForm.get('assignedTo')?.value ?? '';

      this.taskService.addTask({
        title,
        description,
        assignedTo,
        status: 'new'
      });

      this.taskForm.reset();
    }
  }

  deleteTask(taskId: number): void {
    this.taskService.deleteTask(taskId);
  }

  updateTask(task: Task): void {
    this.taskService.updateTask(task);
  }

  moveTask(taskId: number, status: TaskStatuses): void {
    const task = this.tasks.find(t => t.id === taskId);
    if (task) {
      this.taskService.updateTask({ ...task, status });
    }
  }
}
