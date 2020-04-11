import { IRestaurant } from "./restaurant.interface";

export interface ICluster {
  ID?: string;
  LocationId: string;
  RestaurantId: string;
  Restaurant: IRestaurant;
  month: number;
  year: number;
  Cluster: number;
  Service: number;
  Value: number;
  Food: number;
  Vader: number;
  Wordnet: number;
  Variance: number;
  SSE: number;
}
