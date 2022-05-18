import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, NgZone, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from 'src/app/Service/api';
import { Api_Services } from 'src/app/Service/api.services';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CreateComponent implements OnInit {

  submitted = false;
  addproductForm: any = FormGroup;
  product = [];
  imagefile: any;
  preview: any;
  id = '';
  productimageview = '';
  base_url = this._base_url.baseurl

  constructor(
    public ref: ChangeDetectorRef,
    public fb: FormBuilder,
    private ngZone: NgZone,
    private _router: Router,
    private _api: ApiService,
    public router: ActivatedRoute,
    public _base_url: Api_Services
  ) {
    this.mainform();
    const navigation = this._router.getCurrentNavigation();
    const state = navigation?.extras.state as { id: any }
    if (state) {
      this.id = state.id._id,
        this.productimageview = state.id.productimage;

    }
  }

  ngOnInit(): void {
    if (this.id) {
      const data: any = {
        _id: this.id
      }
      this._api.getSingleProduct(data).subscribe({
        next: (res: any) => {
          if (res.status === 1) {
            this.addproductForm.patchValue({
              name: res.response.name,
              description: res.response.description,
              price: res.response.price,
              quantity: res.response.quantity,
              productimage: res.response.productimage
            });
          }
        }
      })
    }
  }
  mainform() {
    this.addproductForm = this.fb.group({
      name: ['', [Validators.required]],
      price: ['', [Validators.required]],
      description: ['', [Validators.required]],
      quantity: ['', [Validators.required]],
      productimage: ['', [Validators.required]]
    })
  }
  get myform() {
    return this.addproductForm?.controls;
  }
  onSelectedFile(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      var image_valid = ['image/jpg', 'image/jpeg', 'image/png', 'image/JPG', 'image/JPEG', 'image/PNG'];
      if (image_valid.indexOf(file.type) == -1) {
        this.addproductForm.controls['productimage'].setValue('')
        return
      }
      this.imagefile = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.preview = reader.result as string;
        this.addproductForm.patchValue({ productimage: reader.result })
      }
      reader.readAsDataURL(file);
    }
  }
  onSubmit() {
    this.submitted = true;
    if (!this.addproductForm.valid) {
      alert('product Must all fied Required')
      return false;
    } else {
      var formdata: any = new FormData();
      if (this.id) {
        formdata.append('id', this.id)
      }
      formdata.append('name', this.addproductForm.value.name)
      formdata.append('description', this.addproductForm.value.description)
      formdata.append('price', this.addproductForm.value.price)
      formdata.append('quantity', this.addproductForm.value.quantity)
      formdata.append('productimage', this.imagefile)
      return this._api.createproduct(formdata).subscribe({
        next: (res: any) => {
          if (res.status === 1) {
            this.ngZone.run(() => this._router.navigate(['/lists']))
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
