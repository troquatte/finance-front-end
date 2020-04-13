import { Component, OnInit } from '@angular/core';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

//Forms
import { FormBuilder, Validators, FormGroup, FormArray, FormControl } from '@angular/forms';

//Interfaces
import { Adicionar } from "../../../models/adicionar";
import { Tags } from 'src/app/models/tags';

//Services
import { ExpensesService } from 'src/app/service/expenses.service';
import { SuccesAnimateComponent } from '../../shared/succes-animate/succes-animate.component';

//Pugins
import * as moment from 'moment';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-adicionar',
  templateUrl: './adicionar.component.html',
  styleUrls: ['./adicionar.component.scss']
})
export class AdicionarComponent implements OnInit {
  public locale = 'pt-br';
  public getDate = new Date().toLocaleDateString(this.locale, { year: 'numeric', month: '2-digit', day: '2-digit' })

  public cadastroForm: FormGroup;
  public payloadReceitas: Adicionar;

  public type: {value:string, status:boolean} = {value:"", status:false};
  public tags = [];
  public buttomDisabled: boolean = true;
  public submit: boolean = false;

  public bsModalRef: BsModalRef;

  public loadUsersTags = [];
  public users_id: number;

  imaskConfigValue = {
    mask: Number,
    scale: 2,
    signed: false,
    thousandsSeparator: '',
    padFractionalZeros: true,
    normalizeZeros: true,
    radix: ',',
    mapToRadix: ['.']
  };

  public tagService:Tags;

  constructor(
    private bsDatepicker: BsLocaleService,
    private formBuilder: FormBuilder,
    private expensesService: ExpensesService,
    private modalService: BsModalService,
    private router: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.users_id = parseInt(this.router.snapshot.paramMap.get('id'));
    this.loadFormBuilder();

    if(this.users_id){
      this.expensesService.readExpenses(this.users_id).subscribe(
        res => {
          let cadastroForm:FormArray = this.cadastroForm.get('tags') as FormArray;
          //Add Tags
          res.tag.forEach( tags => {
            this.loadUsersTags.push(tags.id);
            this.cadastroForm.get('tags').value.push(tags.id)
          });

          //Add values List
          this.cadastroForm.controls['description'].setValue(res.description)
          this.cadastroForm.controls['value'].setValue(res.value)
          this.cadastroForm.controls['period'].setValue(res.period)
          this.cadastroForm.controls['type'].setValue(res.type)


          //Payload List
          const list = {
            target: {
              value: res.type
            }
          }

          this.selecteListType(list)
        }
      );

    }

    this.expensesService.getTags().subscribe(
      res => this.tagService = res
    );

    this.bsDatepicker.use(this.locale);
  }

  ngAfterContentChecked(){
    if(!this.users_id){
      if (this.cadastroForm.dirty && this.cadastroForm.valid && this.type.value && !this.submit) {
        this.buttomDisabled = false;
      }else{
        this.buttomDisabled = true;
      }
    }else{
      this.buttomDisabled = false;
    }
  }

  public loadFormBuilder(){
    this.cadastroForm = this.formBuilder.group({
      description: ["", Validators.required],
      value: ["", Validators.required],
      period: ["", Validators.required],
      type: ["", Validators.required],
      tags: new FormArray([], Validators.required)
    });
  }

  public selectTags(event){
    //Form Array
    const cadastroForm:FormArray = this.cadastroForm.get('tags') as FormArray;

    //If checked add item in checkbox
    if(event.target.checked){
      cadastroForm.push(new FormControl(event.target.value));
    }else{
      //Foreach selected Control
      cadastroForm.controls.forEach((ctrl: FormControl, i) => {
        if(ctrl.value == event.target.value) {
          //Unselect Tag
          cadastroForm.removeAt(i);
          return;
        }
      });

    }
  }

  public selecteListType(event){
    const cadastroForm:FormArray = this.cadastroForm.get('tags') as FormArray;
    //Clear All Tags Selected Changed List Tags
    cadastroForm.clear();

    //Selected validation
    if(event.target.value != ""){
      return this.type = { value: event.target.value, status:false };
    }
      return this.type = { value: event.target.value, status:true };

  }

  public submitForm(){
    // this.cadastroForm.dirty && this.cadastroForm.valid && this.type.value
    //Validate Form and Submit
    if (this.cadastroForm.dirty && this.cadastroForm.valid && this.type.value) {
      //Block Button Submit Form
      this.submit = true;
      this.buttomDisabled = this.submit;

      this.payloadReceitas = {
        ...this.cadastroForm.value,
        period: moment(this.cadastroForm.value.period).format('DD/MM/YYYY'),
        type: this.type.value
      };

      //Create
      if(!this.users_id){
        //Return Modal
        return this.expensesService.addExpenses(this.payloadReceitas).subscribe(

          res => {
            this.bsModalRef = this.modalService.show(SuccesAnimateComponent ,{
              keyboard: false,
              backdrop: true,
              ignoreBackdropClick: true
            });
          }

        );
      }else{
          //Return Modal
          return this.expensesService.updateExpenses(this.users_id, this.payloadReceitas).subscribe(

            res => {
              this.bsModalRef = this.modalService.show(SuccesAnimateComponent ,{
                keyboard: false,
                backdrop: true,
                ignoreBackdropClick: true
              });
            }

          );
      }

    }
    //Final Return Modal


  }
}
