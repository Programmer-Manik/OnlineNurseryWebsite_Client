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

export type TOrder = {
  cashOnDelivery: boolean;
  stripe: boolean;
  name: string;
  email: string;
  phone: string;
  company: string;
  address: string;
  city: string;
  postCode: number;
  country: string;
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
