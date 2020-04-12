import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

//Services
import { ExpenseDataService } from 'src/app/service/expense-data.service';
import { ExpensesService } from 'src/app/service/expenses.service';

//Date Picker
import { BsLocaleService } from 'ngx-bootstrap/datepicker';

//Pugins
import * as moment from 'moment';

@Component({
  selector: 'app-list-group',
  templateUrl: './list-group.component.html',
  styleUrls: ['./list-group.component.scss']
})

export class ListGroupComponent implements OnInit {
  public locale = 'pt-br';

  public loadinList:boolean = true;
  public responseLoadList: any;
  public responsePaginator: any;
  public outputSearch: any;
  public tagService: any;

  public search: FormGroup;

  constructor(
    private bsDaterangepicker: BsLocaleService,
    private expenseDataService: ExpenseDataService,
    private expensesService: ExpensesService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getList();
    this.getListTags();

    //Date Picker Range
    this.bsDaterangepicker.use(this.locale);

    //Form Builder Values
    this.search = this.formBuilder.group({
      rangePick: [],
      type: [''],
      tag: ['']
    });
  }

  public getList(tag:string = "", page:number = 0, prev_date: string = "", curr_date: string = ""){
    let payload = {tag, page, prev_date, curr_date};
    this.outputSearch  = payload;

    this.expenseDataService.getAllExpenses(tag, page, prev_date, curr_date).subscribe(
      res => {
        this.loadinList = false;
        this.responsePaginator = {
          lastPage: res['lastPage'],
          page: res['page'],
          perPage: res['perPage'],
          total: res['total']
        };
        this.responseLoadList  = res['rows'];
      }
    );
  }

  public getListTags(){
    //Get List Tags
    this.expensesService.getTags().subscribe(
      res => this.tagService = res
    );
  }

  public pagination(event){
    this.getList("", event, "", "");
  }

  public searchSubmitForm(){
    const tag = this.search.value.tag;
    let payload;
    if(this.search.value.rangePick){
      const prev_date = moment(this.search.value.rangePick[0]).format('YYYYMMDD');
      const curr_date = moment(this.search.value.rangePick[1]).format('YYYYMMDD');

      payload = {tag: tag, page:0, prev_date: prev_date,curr_date: curr_date};
      this.outputSearch  = payload;


      return this.getList(tag,0, prev_date,curr_date)
    }

    payload = { tag: tag, page:0, prev_date:"", curr_date:"" };
    this.outputSearch = payload;

    return this.getList(tag, 0, "", "")

  }

  public deleteList(i, id){
    this.expensesService.deleteExpenses(id).subscribe(
      res => {
        this.responseLoadList.splice(i,1);
        let payload = { tag: "", page:1, prev_date:"", curr_date:"" };
        this.outputSearch = payload;
      }
    )
  }

}
