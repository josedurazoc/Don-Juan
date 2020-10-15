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
    // todos los productos
    getAllProducts(): Observable<ProductModel[]>{
        return this.httpClient.get<ProductModel[]>(`${this.url}products?orderby=title&order=asc&per_page=100`);
    }
    // todos los productos de una categoria en espesifico
    getAllProductsCategories(keyword: string): Observable<ProductModel[]>{
        return this.httpClient.get<ProductModel[]>(`${this.url}products?category=${keyword}&order=asc&orderby=title&per_page=100`);
    }
    // obtener un solo producto
    getSingleProduct(id: number): Observable<ProductModel> {
        return this.httpClient.get<ProductModel>(`${this.url}products/${id}`);
    }
    // buscar un producto
    searchProducts(keyword: string): Observable<ProductModel[]>{
        return this.httpClient.get<ProductModel[]>(`${this.url}products?search=${keyword}&order=asc&orderby=title&per_page=100`);
    }
    // obtener todas las categorias
    getAllCategories(): Observable<CategoryModel[]>{
        return this.httpClient.get<CategoryModel[]>(`${this.url}products/categories?per_page=100`);
    }

}
