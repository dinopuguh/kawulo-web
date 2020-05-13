import { IRestaurant } from "./restaurant.interface";

export interface ICluster {
  _id?: string;
  location_id: string;
  restaurant_id: string;
  restaurant: IRestaurant;
  month: number;
  year: number;
  cluster: number;
  service: number;
  value: number;
  food: number;
  vader: number;
  wordnet: number;
  variance: number;
  sse: number;
}
