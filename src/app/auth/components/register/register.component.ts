import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthserviceService } from '../../services/authservice.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  students:any[]=[]

  constructor(private build: FormBuilder, private authService:AuthserviceService, private router:Router) {}

  ngOnInit(): void {
    this.createForm()
    this.getStudent()
  }

  createForm() {
    this.registerForm = this.build.group({
      userName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
    });
  }

  getStudent(){
    this.authService.getUsers('students').subscribe((student:any)=>{
      this.students = student
    })
  }

  submit() {
    let model = {
      userName: this.registerForm.value.userName,
      email: this.registerForm.value.email,
      password: this.registerForm.value.password,
    };

    let index = this.students.findIndex(item => item.email == this.registerForm.value.email)
    if(index !== -1){
      alert('الايميل موجود مسبقا')
    }else{
      this.authService.createUser(model).subscribe((res:any)=>{
        console.log(res)
        alert('تم انشاء الحساب')
        this.router.navigate(['/subjects'])
      })
    }
  }
}
