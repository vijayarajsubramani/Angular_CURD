import { Router } from '@angular/router';
import { Component, OnInit, NgZone} from '@angular/core';
import { FormGroup, FormBuilder, Validators,NgForm } from '@angular/forms';
import { ApiService } from 'src/app/Service/api';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  submitted = false;
  addproductForm!:FormGroup;
  product=[];
  imagefile='';
  preview='';

  constructor(
    public fb: FormBuilder,
    private ngZone: NgZone,
    private _router: Router,
    private _api: ApiService,
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
      image: [null]
    })
  }
  get myform() {
    return this.addproductForm?.controls
  }
  onSelectedFile(e:any){
    if(e.target.files.length>0){
      const file=e.target.files[0];
      console.log('files',file)
      let imagevalid=['image/jpg', 'image/jpeg', 'image/png', 'image/JPG', 'image/JPEG', 'image/PNG'];
      if(imagevalid.indexOf(file.type)==-1){
        this.addproductForm.controls['image'].setValue('')
        return
      }
      this.imagefile=file
      const reader=new FileReader();
      reader.onload=()=>{
          this.preview=reader.result as string
      }
      reader.readAsDataURL(file)

    }

  }
  onSubmit() {
    this.submitted = true;
    if (!this.addproductForm.valid) {
      alert('product Must all fied Required')
      return false;
    } else {
      let formData:any=new FormData();
      formData.append('name',this.addproductForm.value.name)
      formData.append('description',this.addproductForm.value.description )
      formData.append('price',this.addproductForm.value.price)
      formData.append('image',this.imagefile )
      formData.append('quantity',this.addproductForm.value.quantity )

      console.log("formdata----",this.imagefile)
      return this._api.createproduct(formData).subscribe({
        next: (res:any) => {
          if(res.status===1){
            res.response.data=this.product;
            this.ngZone.run(() => this._router.navigateByUrl('/lists'))
          }else{
            console.log('error')
          }
        }, 
      })
    }

  }


}
