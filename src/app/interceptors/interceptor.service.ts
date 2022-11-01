import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor{

  constructor() { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
   const token = localStorage.getItem("token");
    if(token){
      const cloned = req.clone({
        headers: req.headers.set("Authorization", "Bearer " + token)
      });
      return next.handle(cloned);
    }else{
      return next.handle(req)
    }
  }
}
