import { Component, OnInit } from '@angular/core';
import { StudentsService } from "./students.service";
import { FormsModule } from "@angular/forms";
import {DatePipe, NgForOf} from "@angular/common";

@Component({
  selector: 'app-students',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    DatePipe,
  ],
  providers: [StudentsService],
  templateUrl: './students.component.html',
  styleUrl: './students.component.css'
})
export class StudentsComponent implements OnInit {
  students: any[] = [];
  newStudent = { name: '', birthDate: '', group: null };
  isEditMode = false;
  currentStudentId: string | null = null;

  constructor(private studentsService: StudentsService) { }

  ngOnInit(): void {
    this.onLoadStudents();
  }

  onLoadStudents(): void {
    this.studentsService.getStudents().subscribe(
      (data) => this.students = data,
      (error) => console.error('Error fetching students:', error)
    );
  }

  onAddStudent(): void {
    if (this.newStudent.name.trim() && this.newStudent.birthDate && this.newStudent.group !== null) {
      if (this.isEditMode && this.currentStudentId) {
        this.studentsService.updateStudent(this.currentStudentId, this.newStudent).subscribe(
          () => {
            this.onLoadStudents();
            this.resetForm();
          },
          (error) => console.error('Error updating student:', error)
        );
      } else {
        this.studentsService.addStudent(this.newStudent).subscribe(
          () => {
            this.onLoadStudents();
            this.resetForm();
          },
          (error) => console.error('Error adding student:', error)
        );
      }
    }
  }

  onEditStudent(student: any): void {
    this.newStudent = { ...student };
    this.isEditMode = true;
    this.currentStudentId = student._id;
  }

  resetForm(): void {
    this.newStudent = { name: '', birthDate: '', group: null };
    this.isEditMode = false;
    this.currentStudentId = null;
  }

  onDeleteStudent(id: string): void {
    this.studentsService.deleteStudent(id).subscribe(
      () => this.onLoadStudents(),
      (error) => console.error('Error deleting student:', error)
    );
  }
}
