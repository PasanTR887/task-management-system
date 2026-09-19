import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TaskService, Task } from '../../services/task';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-edit',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './task-edit.html',
  styleUrl: './task-edit.css'
})
export class TaskEditComponent implements OnInit {
  task: Task = {
    title: '',
    description: '',
    status: 'pending'
  };
  taskId!: number;

  constructor(
    private taskService: TaskService,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.taskId = Number(this.route.snapshot.paramMap.get('id'));
    this.taskService.getTask(this.taskId).subscribe({
      next: (data) => {
        this.task = {
          title: data.title,
          description: data.description,
          status: data.status
        };
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error loading task', err)
    });
  }

  submitForm(): void {
    this.taskService.updateTask(this.taskId, this.task).subscribe({
      next: () => this.router.navigate(['/tasks']),
      error: (err) => console.error('Error updating task', err)
    });
  }
}