export interface ISentiment {
  _id?: string;
  published_date: string;
  month: number;
  year: number;
  translated_text: string;
  service: number;
  value: number;
  food: number;
  vader: number;
  wordnet: number;
}
