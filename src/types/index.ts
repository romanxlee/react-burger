export type Ingredient = {
  id?: string;
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
};

export type Order = {
  name: string;
  order: {
    number: number;
  };
  success: boolean;
};

export type User = {
  email: string;
  name: string;
  password: string;
};

export type Auth = {
  success: boolean;
  user: User;
  accessToken: string;
  refreshToken: string;
};

export type Status = "idle" | "loading" | "succeeded" | "failed";

export type FeedOrder = {
  _id: string;
  createdAt: string;
  ingredients: string[];
  name: string;
  number: number;
  status: string;
  updatedAt: string;
};

export type WebSocketMassage = {
  orders: FeedOrder[];
  success: boolean;
  total: number;
  totalToday: number;
};

export enum WebSocketStatus {
  OFFLINE = "OFFLINE",
  ONLINE = "ONLINE",
  CONNECTING = "CONNECTING",
  CLOSING = "CLOSING",
}
