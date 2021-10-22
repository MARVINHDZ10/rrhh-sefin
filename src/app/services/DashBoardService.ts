import { retry, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class DashBoardService {

  urlServer: string = environment.BASE_API_URL;
  rolesUser = JSON.parse(sessionStorage.getItem("roles") || '{}');
  token = JSON.parse(sessionStorage.getItem("token") || '{}');
  stringRoles = this.rolesUser.roles.reduce((reducer: any, item: any) => {
    return `${reducer}groups=${item}&`
  }, "");


  constructor(private http: HttpClient) { }

  getDasboardTask(): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.token });
    let options = { headers: headers };
    let url = `${this.urlServer}/paseSalidaKSRRHH/getTaskByGroup/${this.stringRoles}`;
    return this.http.get<any>(url, options).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }


  getSolicitudPaseSalidaById(idSolicitud: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.token });
    let options = { headers: headers };
    let url = `${this.urlServer}/microserviciosRRHH/getSolicitudPaseSalidaById/${idSolicitud}`;
    return this.http.get<any>(url, options).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }


  getTaskInputByContainerAndTaskId(data: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.token });
    let options = { headers: headers };
    let url = `${this.urlServer}/paseSalidaKSRRHH/getTaskInputByContainerAndTaskId/${data.task_id}/${data.task_container_id}`;
    return this.http.get<any>(url, options).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  getProceosPath(data: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.token });
    let options = { headers: headers };
    let url = `${this.urlServer}/microserviciosRRHH/getProceosPath/${data.task_container_id}/${data.task_subject}`;
    return this.http.get<any>(url, options).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }


  abortSolicitudPaseSalida(data: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.token });
    let options = { headers: headers };
    let url = `${this.urlServer}/microserviciosRRHH/abortSolicitudPaseSalida/${data.task_id}/${data.task_container_id}`;
    return this.http.delete<any>(url, options).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }


  createSolicitudPaseSalida(data: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.token });
    let options = { headers: headers };
    let url = `${this.urlServer}/paseSalidaKSRRHH/createSolicitudPaseSalida/${data.task_container_id}`;
    delete data.task_container_id;
    return this.http.post<any>(url, data, options).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  updateSolicitudPaseSalida(data: any): Observable<any> {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.token });
    let options = { headers: headers };
    let url = `${this.urlServer}/microserviciosRRHH/updateSolicitudPaseSalida/${data.task_id}/${data.task_container_id}`;
    return this.http.post<any>(url, data, options).pipe(
      retry(1),
      catchError(this.handleError)
    );
  }

  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
