import { Injectable } from '@angular/core';
import { HttpEvent, HttpRequest, HttpHandler, HttpInterceptor, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


export const SkipInterceptor = 'X-Skip-Interceptor';
export const WriteObject = 'X-Write-Object';



@Injectable()
export class BackendInterceptor implements HttpInterceptor {

    constructor() { }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        // this will skip the interception if skipInterceptor header is present
        if (request.headers.has(SkipInterceptor)) {
            const headers: HttpHeaders = request.headers.delete(SkipInterceptor);
            return next.handle(request.clone({ headers }));
        }

        // this will also skip the interception if Write-Objet header is present

        if (request.headers.has(WriteObject)) {
            const headers: HttpHeaders = request.headers.delete(WriteObject);
            const updateRequest = request.clone({
                setParams: {
                    consumer_key: environment.writablesKeys.consumer_key,
                    consumer_Secret: environment.writablesKeys.consumer_secret
                },
                headers
            });


            return next.handle(updateRequest);
        }


        // if both the headers are not present, process normally

        const modifiedRequest = request.clone({
            setParams: {
                consumer_key: environment.readOnlyKeys.consumer_key,
                consumer_secret: environment.readOnlyKeys.consumer_secret
            }
        });
        return next.handle(modifiedRequest);
    }

}
