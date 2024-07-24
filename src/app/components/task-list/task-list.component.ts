import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Task, TaskStatuses } from '../../models/task.model';
import { NgFor } from '@angular/common';
import { TaskComponent } from '../task/task.component';

@Component({
  selector: 'app-task-list',
  standalone: true,
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgFor,
    TaskComponent,
  ],
})
export class TaskListComponent {
  @Input() tasks: Task[] = [];
  @Output() delete = new EventEmitter<number>();
  @Output() move = new EventEmitter<{ taskId: number, status: TaskStatuses }>();

  onDelete(taskId: number): void {
    this.delete.emit(taskId);
  }

  onMove(taskId: number, status: TaskStatuses): void {
    this.move.emit({ taskId, status });
  }
}
