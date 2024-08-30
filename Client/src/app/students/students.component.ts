import { Component, inject, OnInit } from '@angular/core';
import { StudentsService } from '../services/students.service';
import { Observable } from 'rxjs';
import { Student } from '../types/student';
import { AsyncPipe, CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [AsyncPipe, CommonModule, RouterLink],
  templateUrl: './students.component.html',
  styleUrl: './students.component.css'
})
export class StudentsComponent implements OnInit {

  students$!: Observable<Student[]>
  toasterService!: ToastrService;
  studentService = inject(StudentsService);



  ngOnInit(): void {
    this.getStudent();

  }
  delete(id: number) {
    console.log(id);
    this.studentService.deleteStudent(id).subscribe({
      next: (response) => {
        this.getStudent();
        this.toasterService.success("Successfully Deleted");
        
      },
      error:err=>{
        console.log(err);
        this.toasterService.success("Successfulyy Deleted");
      }
    })
  }
  private getStudent(): void {

    this.students$ = this.studentService.getStudents();
  }
}

