// import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the RestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RestProvider {

  public username:any;
  public lender_list:any;
  public borrower_list:any;
  constructor() {
    console.log('Hello RestProvider Provider');
  }

  save_lender_list(money,backtime,rate,borrower_name){
 this.lender_list={
   lloan_money:money,
   lback_time:backtime,
   lrate:rate,
   lender_name:borrower_name,
   username:this.username
 }
  }


  save_borrower_list(money,backtime,rate,lender_name){
    this.borrower_list={
      lloan_money:money,
      lback_time:backtime,
      lrate:rate,
      lender_name:lender_name,
      username:this.username
    }
     }

}
