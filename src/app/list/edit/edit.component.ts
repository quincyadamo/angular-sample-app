import { Component, OnDestroy } from '@angular/core';
import { Product } from '../../product'
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { ProductListService} from '../../product-list.service';
import { Subscription } from 'rxjs/Subscription'
import { Router, ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnDestroy {
  thisTitle: string;
  thisPrice: string;
  thisImageUrl: string;
  thisId: number;
  index;
  productList: Array<Product> = [];
  subscription;
  constructor(
    private _productListService: ProductListService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.subscription = _productListService.observedProductList.subscribe(
      (updatedProductList)=>{this.productList = updatedProductList;},
      (err)=>{},
      ()=>{}
    )
    this._route.params.subscribe((param)=>{
      for (let i = 0; i < this.productList.length; ++i){
        if (this.productList[i].id == param.id){
          this.thisTitle = this.productList[i].title;
          this.thisPrice = this.productList[i].price;
          this.thisImageUrl = this.productList[i].imageUrl;
          this.thisId = i;
        }
      }
      if (!(this.thisTitle && this.thisPrice && this.thisImageUrl)){
        this._router.navigate(['/products'])
      }
    })
  }
  deleteThis(id){
    this.productList.splice(this.thisId, 1);
    this.updateProducts();
    this._router.navigate(['/products']);
  }
  editProduct(){
    this.productList[this.thisId].title = this.thisTitle;
    this.productList[this.thisId].price = this.thisPrice;
    this.productList[this.thisId].imageUrl = this.thisImageUrl;
    this.updateProducts();
    this._router.navigate(['/products'])
  }
  updateProducts(){
    this._productListService.updateProducts(this.productList);
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
