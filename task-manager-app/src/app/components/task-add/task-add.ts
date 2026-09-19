import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService, Task } from '../../services/task';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-task-add',
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './task-add.html',
  styleUrl: './task-add.css',
})
export class TaskAddComponent {
  task: Task = {
    id: 0,
    title: '',
    description: '',
    status: 'pending',
  };

  constructor(private taskService: TaskService, private router: Router) {}

  submitForm(): void{
    this.taskService.createTask(this.task).subscribe({
      next: () => this.router.navigate(['/tasks']),
      error: (err) => console.error('Error creating task:', err)
    });
  }   
}
