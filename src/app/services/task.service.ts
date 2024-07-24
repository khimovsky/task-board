import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from '../models/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskService implements OnInit {
  private tasksSubject = new BehaviorSubject<Task[]>([]);
  private nextId = 1;

  public tasks$ = this.tasksSubject.asObservable();

  ngOnInit() {
    this.tasksSubject.next([]);
  }

  getTasks(): Observable<Task[]> {
    return this.tasks$;
  }

  addTask(task: Omit<Task, 'id'>): void {
    const newTask = { ...task, id: this.nextId++ };
    const tasks = this.tasksSubject.getValue();
    this.tasksSubject.next([...tasks, newTask]);
  }

  deleteTask(taskId: number): void {
    const tasks = this.tasksSubject.getValue().filter(task => task.id !== taskId);
    this.tasksSubject.next(tasks);
  }

  updateTask(updatedTask: Task): void {
    const tasks = this.tasksSubject.getValue().map(task =>
      task.id === updatedTask.id ? updatedTask : task
    );
    this.tasksSubject.next(tasks);
  }
}
