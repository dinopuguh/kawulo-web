export class Location {
  private _id?: string;
  private latitude: number = 53.9;
  private longitude: number = 27.5667;
  private name?: string = "";

  constructor(latitude: number, longitude: number, name?: string) {
    this.latitude = latitude;
    this.longitude = longitude;
    if (name != null) this.name = name;
  }

  public getId(): string {
    return this._id;
  }

  public getLat(): number {
    return this.latitude;
  }

  public getLong(): number {
    return this.longitude;
  }

  public getName(): string {
    return this.name;
  }
}
