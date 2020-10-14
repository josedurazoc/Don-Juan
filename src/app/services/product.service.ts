import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ProductModel } from 'src/models/product-model';
import { CategoryModel } from './../../models/categoryModel';

@Injectable({providedIn: 'root'})

export class ProductService {

    private url = environment.backend_api_url;
    private ck = environment.readOnlyKeys.consumer_key;
    private cs = environment.readOnlyKeys.consumer_secret;

    constructor(private httpClient: HttpClient) {}

    getAllProducts(): Observable<ProductModel[]>{
        return this.httpClient.get<ProductModel[]>(`${this.url}products?orderby=title&order=asc&per_page=100`);
    }
    getAllProductsCategories(keyword: string): Observable<ProductModel[]>{
        return this.httpClient.get<ProductModel[]>(`${this.url}products?category=${keyword}&order=asc&orderby=title&per_page=100`);
    }

    getSingleProduct(id: number): Observable<ProductModel> {
        return this.httpClient.get<ProductModel>(`${this.url}products?${id}`);
    }

    searchProducts(keyword: string): Observable<ProductModel[]>{
        return this.httpClient.get<ProductModel[]>(`${this.url}products?search=${keyword}&order=asc&orderby=title&per_page=100`);
    }
    getAllCategories(): Observable<CategoryModel[]>{
        return this.httpClient.get<CategoryModel[]>(`${this.url}products/categories?per_page=100`);
    }

    getAllProductsSearched(): Observable<ProductModel[]>{
        return this.httpClient.get<ProductModel[]>(`${this.url}products?order=asc&orderby=title&per_page=100`);
    }
}
