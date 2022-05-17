import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, NgZone, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/Service/api';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateComponent implements OnInit {

  submitted = false;
  addproductForm!: FormGroup;
  product = [];
  imagefile: any;
  preview = '';
  id = ''

  constructor(
    public ref: ChangeDetectorRef,
    public fb: FormBuilder,
    private ngZone: NgZone,
    private _router: Router,
    private _api: ApiService,
    public router: ActivatedRoute,
  ) {
    this.mainform();
    const navigation = this._router.getCurrentNavigation();
    const state = navigation?.extras.state as {id: string}
    if (state) {
      this.id = state.id
    }

  }

  ngOnInit(): void {
    if (this.id) {
      this._api.getSingleProduct(this.id).subscribe({
        next: (res: any) => {
          console.log('res', res)
          this.addproductForm.patchValue({
            name: res.response.name,
            description: res.response.description,
            price: res.response.price,
            productimage: res.response.productimage,
            quantity: res.response.quantity
          })
        }
      })

    }
  }
  getId() {
    

  }


  mainform() {
    this.addproductForm = this.fb.group({
      name: ['', [Validators.required]],
      price: ['', [Validators.required]],
      description: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
      productimage: [null]
    })
  }
  get myform() {
    return this.addproductForm?.controls
  }
  onSelectedFile(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.addproductForm.get('productimage')?.setValue(file);
      this.imagefile = file;
    }
  }
  onSubmit() {
    this.submitted = true;
    if (!this.addproductForm.valid) {
      alert('product Must all fied Required')
      return false;
    } else {
      let params: any = {};
      if (this.id) {
        params.id = this.id;
        params.name = this.addproductForm.value.name;
        params.description = this.addproductForm.value.description;
        params.price = this.addproductForm.value.price;
        params.productimage = this.imagefile;
        params.quantity = this.addproductForm.value.quantity;

      } else {
        params.name = this.addproductForm.value.name;
        params.description = this.addproductForm.value.description;
        params.price = this.addproductForm.value.price;
        params.productimage = this.imagefile;
        params.quantity = this.addproductForm.value.quantity;
      }
      return this._api.createproduct(params).subscribe({
        next: (res: any) => {
          if (res.status === 1) {
            this.ngZone.run(() => this._router.navigateByUrl('/lists'))
            res.response.data = this.product;
          } else {
            console.log('error')
          }
          this.ref.markForCheck();
        },
      }
      )
    }

  }


}
