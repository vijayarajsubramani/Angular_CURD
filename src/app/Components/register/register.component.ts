import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/Service/api';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  submitted = false;
  registerForm!: FormGroup;

  constructor(
    public fb: FormBuilder,
    private ngZone: NgZone,
    private _router: Router,
    private _api: ApiService
  ) {
    this.mainform();

  }

  ngOnInit(): void {
  }

  mainform() {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirm_password: ['', [Validators.required]]
    })
  }
  get myform() {
    return this.registerForm?.controls
  }

  onSubmit() {
    this.submitted = true;
    if (!this.registerForm.valid) {
      console.log('check if ')
      alert('Register Must all fied Required')
      return false;
    } else {
      console.log('check else')
      return this._api.register(this.registerForm.value).subscribe({
        complete: () => {
          this.ngZone.run(() => this._router.navigateByUrl('/signin'))
        }, error: (e) => {
          console.log('e'), e
        }
      })
    }

  }

}
