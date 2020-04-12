import { Component, OnInit, Input, SimpleChanges } from '@angular/core';
import { BalanceService } from 'src/app/service/balance.service';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss']
})
export class BalanceComponent implements OnInit {

  @Input() set setBalance(value){
    this.getBalance(value)
  }

  public getVals: { balance, despesa, receita };

  constructor(private balanceService:BalanceService) { }

  ngOnInit(): void {
  }

  public getBalance(value){
    const { tag, page, prev_date, curr_date } = value;

    this.balanceService.getBalance( tag, page, prev_date, curr_date ).subscribe(
      res => {
        this.getVals = {
          balance: res['balance'],
          despesa: res['despesa'],
          receita: res['receita']
        }
      }
    )
  }

}
