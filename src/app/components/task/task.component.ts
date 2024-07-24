import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Task, TaskStatuses } from '../../models/task.model';
import { NgIf } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-task',
  standalone: true,
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    NgIf,
    MatCardModule,
    MatButton,
  ],
})
export class TaskComponent {
  @Input() task!: Task;
  @Output() delete = new EventEmitter<number>();
  @Output() move = new EventEmitter<TaskStatuses>();

  onDelete(): void {
    this.delete.emit(this.task.id);
  }

  onMove(status: TaskStatuses): void {
    this.move.emit(status);
  }
}
