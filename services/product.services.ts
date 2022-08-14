import { axiosInstance } from "@services/api.services";
import { ItemsResponse, ErrorResponse, Items } from "@typesData/items";

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

const items = async (category: any, tenant: any): Promise<Response> => {
  try {
    const result: ItemsResponse = await axiosInstance.get(
      `/items?category=${category}&tenant=${tenant}`
    );
    return { result: result.data };
  } catch (err: any) {
    const error = err as ErrorResponse;
    console.log(error);
    return { error: error };
  }
};

const sale = async (tenant: string): Promise<Response> => {
  try {
    const result: ItemsResponse = await axiosInstance.get(
      `/items?_page=1&_limit=4&tenant=${tenant}`
    );
    return { result: result.data };
  } catch (err: any) {
    const error = err as ErrorResponse;
    console.log(error);
    return { error: error };
  }
};

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
    const res = await axiosInstance.delete(`/cart?userId=${id}`);
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
  items: items,
  sale: sale,
  getCart: getCart,
  addToCart: addToCart,
  removeFromCart: removeFromCart,
  clearCart: clearCart,
};
