import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/Service/api';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TokenStorageService } from 'src/app/Service/token';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  submitted = false;
  loginForm!: FormGroup;

  constructor(
    public fb: FormBuilder,
    private ngZone: NgZone,
    private _router: Router,
    private _api: ApiService,
    private _token:TokenStorageService

  ) {
    this.mainform();

  }

  ngOnInit(): void {
  }

  mainform() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    })
  }
  get myform() {
    return this.loginForm?.controls
  }

  onSubmit() {
    this.submitted = true;
    if (!this.loginForm.valid) {
      return false;
    } else {
      return this._api.login(this.loginForm.value).subscribe({
          next: (res) => {
            if(res.status===1){
              this._token.setToken(res.response.auth_token);
              this.ngZone.run(() => this._router.navigateByUrl('/add'))
            }else{
              this.ngZone.run(() => this._router.navigateByUrl('/'))
            }
          }, 
          error: (e:any) => {
            console.log('err--->',e)
          }
        })
    }

  }

}
