export interface IRestaurant {
  ID?: string;
  LocationId: string;
  Name: string;
  Latitude: string;
  Longitude: string;
  NumReviews: string;
  Photo: IPhoto;
  Rating: string;
  PriceLevel: string;
  Price: string;
  Address: string;
  Phone: string;
  Website: string;
  RawRanking: string;
  RankingGeo: string;
  RankingPosition: string;
  RankingDenominator: string;
  RankingCategory: string;
  Ranking: string;
  SubCategory: ISubCategory[];
  LocationID: string;
  LocationObjectID: string;
  CreatedAt: Date;
}

interface IPhoto {
  Images: IImages;
}

interface IImages {
  Thumbnail: IImage;
  Original: IImage;
  Medium: IImage;
  Large: IImage;
}

interface IImage {
  Width: string;
  Url: string;
  Height: string;
}

interface ISubCategory {
  Key: string;
  Name: string;
}
