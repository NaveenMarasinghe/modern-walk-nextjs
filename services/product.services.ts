import { axiosInstance } from "@services/api.services";
import { ItemsResponse, ErrorResponse, Items } from "@typesData/items";
import Category from "pages/category/[category]";

export type ClothingType = "men" | "women" | "clothing";

export type CartItems = {
  id: number;
  itemId: number;
  title: string;
  price: number;
  qty: number;
};

export type Response = {
  result?: Items[];
  error?: ErrorResponse;
};

export type categoriesResult = {
  data: string[];
};

export type CategoryResponse = {
  result?: string[];
  error?: ErrorResponse;
};

const clothing = async (category: any): Promise<Response> => {
  try {
    const result: ItemsResponse = await axiosInstance.get(`/${category}`);
    console.log(result);
    return { result: result.data };
  } catch (err: any) {
    const error = err as ErrorResponse;
    console.log(error);
    return { error: error };
  }
};

async function getCategories(): Promise<CategoryResponse> {
  try {
    const result: categoriesResult = await axiosInstance.get(`/${Category}`);
    console.log(result);
    return { result: result.data };
  } catch (err: any) {
    const error = err as ErrorResponse;
    return { error: error };
  }
}

async function getCart(id: number) {
  try {
    const res = await axiosInstance.get(`/cart?userId=${id}`);
    return res;
  } catch (err) {
    console.log(err);
  }
}

async function addToCart(items: CartItems[], id: number) {
  try {
    const res = await axiosInstance.post(`/cart`, items);
    return res;
  } catch (err) {
    return err;
  }
}

async function removeFromCart(id: number) {
  try {
    const res = await axiosInstance.delete(`/cart/${id}`);
    return res;
  } catch (err) {
    return err;
  }
}

async function clearCart(userId: number) {
  try {
    const res = await axiosInstance.delete(`/cart?userId=${userId}`);
    return res;
  } catch (err) {
    return err;
  }
}

export const ProductAPI = {
  clothing: clothing,
  getCart: getCart,
  addToCart: addToCart,
  removeFromCart: removeFromCart,
  clearCart: clearCart,
  getCategories: getCategories,
};
