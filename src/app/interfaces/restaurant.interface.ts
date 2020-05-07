import { ICluster } from "./cluster.interface";
import { ITemporal } from "./temporal.interface";
import { IPrediction } from "./prediction.interface";
import { ISentiment } from "./sentiment.interface";
import { IStats } from "./stats.interface";
import { IHeatmap } from "./heatmap.interface";

export interface IRestaurant {
  _id?: string;
  location_id: string;
  name: string;
  latitude: string;
  longitude: string;
  num_reviews: string;
  photo: IPhoto;
  rating: string;
  price_level: string;
  price: string;
  address: string;
  phone: string;
  website: string;
  raw_ranking: string;
  ranking_geo: string;
  ranking_position: string;
  ranking_denominator: string;
  ranking_category: string;
  ranking: string;
  sub_category: ISubCategory[];
  locationID: string;
  location_ObjectId: string;
  created_at: Date;
}

export interface IRestaurantDetail {
  cluster: ICluster;
  temporal: ITemporal[];
  sentiments: ISentiment[];
  service_stats: IStats;
  value_stats: IStats;
  food_stats: IStats;
  vader_stats: IStats;
  wordnet_stats: IStats;
  heatmap: IHeatmap[];
}

interface IPhoto {
  images: IImages;
}

interface IImages {
  thumbnail: IImage;
  original: IImage;
  medium: IImage;
  large: IImage;
}

interface IImage {
  width: string;
  url: string;
  height: string;
}

interface ISubCategory {
  key: string;
  name: string;
}
