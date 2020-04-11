import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {
  LOCATION_SEARCH_API_URL,
  CLUSTER_RESTAURANT_API_URL,
  LOCATION_API_URL,
  DETAIL_RESTAURANT_API_URL
} from "./config";
import { ILocation } from "../interfaces/location.interface";
import { ICluster } from "../interfaces/cluster.interface";
import { IRestaurantDetail } from "../interfaces/restaurant.interface";

@Injectable({
  providedIn: "root"
})
export class ApiService {
  constructor(private readonly http: HttpClient) {}

  async getLocations(query: string): Promise<ILocation[]> {
    try {
      const url = LOCATION_SEARCH_API_URL + query;

      const httpOptions = {
        headers: new HttpHeaders({
          "Access-Control-Allow-Origin": "*"
        })
      };

      return await this.http.get<ILocation[]>(url, httpOptions).toPromise();
    } catch (error) {
      console.error(error);
    }
  }

  async getLocationById(id: string): Promise<ILocation> {
    try {
      const url = LOCATION_API_URL + id;

      const httpOptions = {
        headers: new HttpHeaders({
          "Access-Control-Allow-Origin": "*"
        })
      };

      return await this.http.get<ILocation>(url, httpOptions).toPromise();
    } catch (error) {
      console.error(error);
    }
  }

  async getRestaurantClusters(
    location: string,
    month: number,
    year: number
  ): Promise<ICluster[]> {
    try {
      const url = `${CLUSTER_RESTAURANT_API_URL}${location}/${month}/${year}`;

      return await this.http.get<ICluster[]>(url).toPromise();
    } catch (error) {
      console.error(error);
    }
  }

  async getRestaurantDetail(
    restaurant_id: string,
    month: number,
    year: number
  ): Promise<IRestaurantDetail> {
    try {
      const url = `${DETAIL_RESTAURANT_API_URL}${restaurant_id}/${month}/${year}`;

      return await this.http.get<IRestaurantDetail>(url).toPromise();
    } catch (error) {
      console.error(error);
    }
  }
}
