import { Routes } from '@angular/router';
import { TaskListComponent } from './components/task-list/task-list';
import { TaskAddComponent } from './components/task-add/task-add';
import { TaskEditComponent } from './components/task-edit/task-edit';
import { TaskViewComponent } from './components/task-view/task-view';

export const routes: Routes = [
  { path: '', redirectTo: 'tasks', pathMatch: 'full' },
  { path: 'tasks', component: TaskListComponent },
  { path: 'tasks/add', component: TaskAddComponent },
  { path: 'tasks/edit/:id', component: TaskEditComponent },
  { path: 'tasks/view/:id', component: TaskViewComponent },
];