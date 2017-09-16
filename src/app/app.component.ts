import { Component, OnDestroy } from '@angular/core';
import { Product } from './product'
import { BehaviorSubject } from 'rxjs/BehaviorSubject'
import { ProductListService } from './product-list.service'
import { Subscription } from 'rxjs/Subscription'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string = 'PPM - Project Product Management';
  productList: Array<Product> = [];
  nextProductId = 1;
  subscription: Subscription;
  otherSubscription: Subscription;
  constructor(private _productListService: ProductListService){
    _productListService.updateProducts(this.productList)
    this.subscription = _productListService.observedProductList.subscribe(
      (updatedProductList)=>{
        this.productList = updatedProductList;
      },
      (err)=>{},
      ()=>{}
    )
    _productListService.updateNextProductId(this.nextProductId)
    this.otherSubscription = _productListService.observedNextProductId.subscribe(
      (updatedNextProductId)=>{
        this.nextProductId = updatedNextProductId;
      },
      (err)=>{},
      ()=>{}
    )
  };
  ngOnDestroy(){
    this.subscription.unsubscribe();
    this.otherSubscription.unsubscribe();
  }
}