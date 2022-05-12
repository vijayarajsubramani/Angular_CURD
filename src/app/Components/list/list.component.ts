import { Component, OnInit } from '@angular/core';
import { Apiservice } from 'src/app/Service/api';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  Todo:any=[];


  constructor(private apiservice:Apiservice) { 
    this.listtodo();
  }

  ngOnInit(): void {};


  removetodo(id:any){
    if(window.confirm('Are you sure ?')){
      this.apiservice.deletetodo({id:id}).subscribe((data)=>{
        console.log('deled todo')
        this.listtodo()
      })
    }
  }

  listtodo(){
    this.apiservice.listTodo().subscribe((data:any)=>{
      console.log("todolist",data)
      this.Todo=data.data;
    })
  }

}
