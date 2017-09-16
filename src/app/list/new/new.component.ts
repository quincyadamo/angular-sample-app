import { Component, OnDestroy, Input } from '@angular/core';
import { Product } from '../../product'
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ProductListService} from '../../product-list.service';
import { Subscription } from 'rxjs/Subscription'
import { Router } from '@angular/router'

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnDestroy {
  productList = [];
  subscription;
  otherSubscription;
  nextProductId;
  newProduct = new Product();
  constructor(
    private _productListService: ProductListService,
    private _router: Router
  ) {
    this.subscription = _productListService.observedProductList.subscribe(
      (updatedProductList)=>{this.productList = updatedProductList;},
      (err)=>{},
      ()=>{}
    )
    this.otherSubscription = _productListService.observedNextProductId.subscribe(
      (updatedNextProductId)=>{
        this.nextProductId = updatedNextProductId;
      },
      (err)=>{},
      ()=>{}
    )
  }
  updateProducts(){
    this._productListService.updateProducts(this.productList);
  }
  updateNextProductId(){
    this._productListService.updateNextProductId(this.nextProductId);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.otherSubscription.unsubscribe();
  }
  addProduct(){
    if(!this.newProduct.imageUrl){
      this.newProduct.imageUrl = 'https://image.flaticon.com/icons/png/128/25/25333.png';
    }
    this.newProduct.id = this.nextProductId;
    this.nextProductId += 1;
    this.productList.push(this.newProduct);
    this.updateProducts();
    this.updateNextProductId();
    this._router.navigate(['products/']);
  }
}
