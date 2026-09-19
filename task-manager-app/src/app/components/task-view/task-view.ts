import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TaskService } from '../../services/task';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-task-view',
  standalone: true,
  imports: [CommonModule, RouterLink, DatePipe],
  templateUrl: './task-view.html',
  styleUrl: './task-view.css'
})
export class TaskViewComponent implements OnInit {
  task: any = null;
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
        this.task = data;
        this.cdr.detectChanges();
      },
      error: (err) => console.error('Error loading task', err)
    });
  }

  deleteTask(): void {
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(this.taskId).subscribe({
        next: () => this.router.navigate(['/tasks']),
        error: (err) => console.error('Error deleting task', err)
      });
    }
  }
}