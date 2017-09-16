import { Component, OnDestroy } from '@angular/core';
import { Product } from '../product'
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ProductListService} from '../product-list.service';
import { Subscription } from 'rxjs/Subscription'
import { Router } from '@angular/router'

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnDestroy {
  productList = [];
  subscription;
  constructor(
    private _productListService: ProductListService,
    private _router: Router,
  ) {
    this.subscription = _productListService.observedProductList.subscribe(
      (updatedProductList)=>{this.productList = updatedProductList;},
      (err)=>{},
      ()=>{}
    )
  }
  updateProducts(){
    this._productListService.updateProducts(this.productList);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  editThis(id){
    console.log(id);
    this._router.navigate(['products/edit/', id])
  }
  deleteThis(id){
    for (let i = 0; i < this.productList.length; ++i){
        if (this.productList[i].id == id){
          this.productList.splice(i, 1);
          this.updateProducts();
        }
    }
  }
}
