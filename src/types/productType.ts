export type TProduct = {
  _id?: string;
  title?: string;
  price?: number;
  category?: string;
  rating?: number;
  imageUrl?: string;
  description?: string;
  quantity?: number;
};

export type Category = {
  _id: string;
  name: string;
  description?: string;
};

export type TOrderProductItemType = {
  _id: string;
  quantity: number;
  title: string;
  category: string;
  imageUrl: string;
};

export type TOrder = {
  productItem: [];
  _id: string;
  cashOnDelivery: boolean;
  CashOnDelivery?: boolean;
  stripe: boolean;
  StripePayment?: boolean;
  name: string;
  email: string;
  phone: string;
  phoneNumber?: string;
  company: string;
  address: string;
  city: string;
  postCode: number;
  country: string;
  TotalPrice?: number;
};

export type TCartItem = {
  _id: string;
  title: string;
  price: number;
  category: string;
  imageUrl: string;
  description: string;
  quantity: number;
  totalPrice: number;
};
export interface RouteParams {
  id: string; // Adjust type according to your actual parameter type
}
