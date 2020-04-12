import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  @Input()  data;
  @Output() pagination: EventEmitter<number> = new EventEmitter<number>();

  public totalPage: number;

  imaskNumber = {
    mask: Number,
  };

  constructor() { }

  ngOnInit(): void {
    this.totalPage = Math.ceil(this.data.total / this.data.perPage)
  }

  public prevPage(number){
    this.pagination.emit(number);
  }

  public nextPage(number){
    this.pagination.emit(number);
  }

  public submitPage(number){
    if(number.key == "Enter"){
      this.pagination.emit(number.target.value);
    }
  }

}
