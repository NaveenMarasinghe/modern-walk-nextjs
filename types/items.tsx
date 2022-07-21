export type Items = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};

export type CategoryDetails = {
  id: number;
  url: string;
  categoryTitle: string;
};

export type ItemsResponse = {
  data: Items[];
};

export type ErrorResponse = {
  code: string;
  message: string;
  name: string;
  request: any;
  response: any;
};
