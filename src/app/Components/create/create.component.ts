import { Router } from '@angular/router';
import { Component, OnInit, NgZone } from '@angular/core';
import { Apiservice } from 'src/app/Service/api';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  submitted = false;
  todoForm!: FormGroup;

  constructor(
    public fb: FormBuilder,
    private ngZone: NgZone,
    private router: Router,
    private apiService: Apiservice
  ) {
    this.mainform();
  }

  ngOnInit(): void { }
  mainform() {
    this.todoForm = this.fb.group({
      name: ['', [Validators.required]],
      jobRole: ['', [Validators.required]]
    })
  }
  get myform() {
    return this.todoForm?.controls;
  }
  onSubmit() {
    this.submitted = true;
    if (!this.todoForm?.valid) {
      console.log("check")
      return false
    } else {
      return this.apiService.createTodo(this.todoForm.value).subscribe({
        complete: () => {
          console.log('todo created successfully')
          this.ngZone.run(() => this.router.navigateByUrl('/lists'))
        },
        error: (e) => {
          console.log('error', e)
        }
      })
    }

  }

}
