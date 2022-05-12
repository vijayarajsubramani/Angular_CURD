import { Component, OnInit, NgZone } from '@angular/core';
import { Apiservice } from 'src/app/Service/api';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router,ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  submitted = false;
  todoForm!: FormGroup;

  constructor(
    public fb: FormBuilder,
    private actRoute: ActivatedRoute,
    private ngZone:NgZone,
    private router: Router,
    private apiService: Apiservice
  ) {
  }

  ngOnInit(): void { 
    let id =this.actRoute.snapshot.paramMap.get('id');
    this.getTodo(id);
    this.todoForm=this.fb.group({
      id,
      name: ['', [Validators.required]],
      jobRole: ['', [Validators.required]]

    })
  }
  get myform() {
    return this.todoForm?.controls;
  }

  getTodo(id: any){
    this.apiService.getSingleTodo({id:id}).subscribe((data:any)=>{
      this.todoForm.setValue({
        id:data.data["_id"],
        name:data.data['name'],
        jobRole:data.data['jobRole']
      })

    })
  }


  onSubmit() {
    this.submitted = true;
    if (!this.todoForm?.valid) {
      return false
    } else {
      return this.apiService.createTodo(this.todoForm.value).subscribe({
        complete: () => {
          console.log('todo updated successfully')
          this.ngZone.run(() => this.router.navigateByUrl('/lists'))
        },
        error: (e) => {
          console.log('error', e)
        }
      })
    }

  }


}
