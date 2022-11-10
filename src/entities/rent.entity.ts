export interface Rent {
  id: number;
  startdate: Date;
  lastdate: Date;
  rent_price: number;
  car_id: number;
}

export interface Contract {
  Response: string;
  Car_ID?: number;
  Rent_Period?: string;
  Total_Price?: string;
}
