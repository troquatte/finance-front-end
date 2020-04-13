import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Router } from '@angular/router';

@Component({
  selector: 'app-succes-animate',
  templateUrl: './succes-animate.component.html',
  styleUrls: ['./succes-animate.component.scss']
})
export class SuccesAnimateComponent implements OnInit {

  constructor(
    public bsModalRef: BsModalRef,
    private router: Router
    ) { }

  ngOnInit(): void {
    setTimeout(()=>{
      this.close()
      this.router.navigate(["/lancamento"]);
    },1500)
  }

  public close(){
    this.bsModalRef.hide()
  }
}
