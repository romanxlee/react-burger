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
