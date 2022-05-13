import { Router } from '@angular/router';
import { Component, OnInit, NgZone } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/Service/api';
import { TokenStorageService } from 'src/app/Service/token';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  submitted = false;
  addproductForm!: FormGroup;
  product=[]

  constructor(
    public fb: FormBuilder,
    private ngZone: NgZone,
    private _router: Router,
    private _api: ApiService,
    private _token:TokenStorageService


  ) {
    this.mainform();
  }

  ngOnInit(): void { }
  mainform() {
    this.addproductForm = this.fb.group({
      name: ['', [Validators.required]],
      price: ['', [Validators.required]],
      description: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
      image: ['', [Validators.required]]
    })
  }
  get myform() {
    return this.addproductForm?.controls
  }
  onSubmit() {
    this.submitted = true;
    if (!this.addproductForm.valid) {
      alert('Register Must all fied Required')
      return false;
    } else {
      console.log('check else')
      return this._api.createproduct(this.addproductForm.value).subscribe({
        next: (res:any) => {
          if(res.status===1){
            res.response.data=this.product;
            this.ngZone.run(() => this._router.navigateByUrl('/add'))
          }else{
            console.log('error')
          }
        }, 
      })
    }

  }


}
