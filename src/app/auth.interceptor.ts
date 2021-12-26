import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from "@angular/common/http"
import { Observable } from "rxjs"

export class AuthInterceptor implements HttpInterceptor {
  public token = JSON.parse(<string>localStorage.getItem("token"));
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const cloneReq = req.clone({
      headers: req.headers.set(
        "Authorization",
        this.token
      ),
    })
    return next.handle(cloneReq)
  }
}
