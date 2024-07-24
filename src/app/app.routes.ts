import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/users',
    pathMatch: 'full',
  },
  {
    path: 'board',
    loadComponent: () => import('./components/task-board/task-board.component')
      .then((c) => c.TaskBoardComponent)
  },
  {
    path: '**',
    redirectTo: 'board',
    pathMatch: 'full',
  }
];

