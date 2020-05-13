export interface IPredictionResponse {
  predictions: IPrediction[];
  error: IPredictionError;
}

export interface IPrediction {
  _id: string;
  baseline: number;
  n_train: number;
  alpha: number;
  month: number;
  year: number;
  service: number;
  value: number;
  food: number;
  vader: number;
  wordnet: number;
}

export interface IPredictionError {
  _id: string;
  n_prediction: number;
  baseline: number;
  n_train: number;
  alpha: number;
  restaurant_id: string;
  service_error: number;
  value_error: number;
  food_error: number;
  vader_error: number;
  wordnet_error: number;
  overall_error: number;
}
