import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import {
  LOCATION_SEARCH_API_URL,
  CLUSTER_RESTAURANT_API_URL,
  LOCATION_API_URL
} from "./config";

@Injectable({
  providedIn: "root"
})
export class ApiService {
  constructor(private readonly http: HttpClient) {}

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  getLocations(query: string): Observable<any[]> {
    const url = LOCATION_SEARCH_API_URL + query;

    const httpOptions = {
      headers: new HttpHeaders({
        "Access-Control-Allow-Origin": "*"
      })
    };

    return this.http.get<any[]>(url, httpOptions).pipe(
      tap(locations => console.log(locations)),
      catchError(this.handleError("getLocations", []))
    );
  }

  getLocationById(id: string): Observable<any> {
    const url = LOCATION_API_URL + id;

    const httpOptions = {
      headers: new HttpHeaders({
        "Access-Control-Allow-Origin": "*"
      })
    };

    return this.http.get<any>(url, httpOptions).pipe(
      tap(location => console.log(location)),
      catchError(this.handleError("getLocation", []))
    );
  }

  getRestaurantClusters(
    location: string,
    month: number,
    year: number
  ): Observable<any> {
    const url = `${CLUSTER_RESTAURANT_API_URL}${location}/${month}/${year}`;

    return this.http.get<any>(url).pipe(
      tap(clusters => console.log(clusters)),
      catchError(this.handleError("getRestaurants", []))
    );
  }
}
