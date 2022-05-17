import { Component, OnInit ,Input} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {
  @Input() overallcount:any;
  @Input() limit:any;


  bigCurrentPage = 1;

  constructor() { }

  ngOnInit(): void {
  }

}

