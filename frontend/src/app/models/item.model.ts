export interface Item {
  _id: string;
  user: string;
  category: string;
  title: string;
  description: string;
  image: string;
  price: number;
}

export interface ItemDetail {
  _id: string;
  user: {
    _id: string;
    name: string;
    phone: string;
  };
  category: {
    name: string;
  };
  title: string;
  description: string;
  image: string;
  price: number;
}

export interface CreateItemData {
  [key: string]: any;
  category: string;
  title: string;
  description: string;
  image: string;
  price: number;
}

export interface FieldError {
  message: string;
}

export interface CreateError {
  errors: {
    category: FieldError;
    title: FieldError;
    description: FieldError;
    image: FieldError;
    price: FieldError;
  }
}

export interface ItemError {
  error: string;
}
