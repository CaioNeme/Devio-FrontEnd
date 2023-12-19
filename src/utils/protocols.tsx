export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  productType: string;
  soldTimes: number;
  createdAt: string;
  updatedAt: string;
};

export type Extra = {
  id: number;
  name: string;
  description: string;
  price: number;
  productType: string;
  image: string;
  createdAt: string;
  updatedAt: string;
};

export type ItensToRequest = {
  note: string;
  quantity: number;
  paidPrice: number;
  productId: number;
  extraId: number;
  name?: string;
};

export type PropsModalComponent = {
  product: Product;
  setItens: React.Dispatch<React.SetStateAction<ItensToRequest[]>>;
  itens: ItensToRequest[];
  extras: Extra[];
  setItensIds: React.Dispatch<React.SetStateAction<number[]>>;
  itensIds: number[];
  setProductsIds: React.Dispatch<React.SetStateAction<number[]>>;
  productsIds: number[];
  closeModal: () => void;
};

export type Item = {
  id: number;
  note: string;
  quantity: number;
  paidPrice: number;
  status: string;
  productId: number;
  productImage: string;
  productName: string;
  extraId: number;
};

export type PropsProductList = {
  type: string;
  products: Product[];
  setItens: React.Dispatch<React.SetStateAction<Item[]>>;
  itens: Item[];
  itensIds: number[];
  setProductsIds: React.Dispatch<React.SetStateAction<number[]>>;
  productsIds: number[];
  setItensIds: React.Dispatch<React.SetStateAction<number[]>>;
};

export type PropsOrderList = {
  type: string;
};

export type PropsPanelList = {
  type: string;
};

export type Order = {
  id: number;
  clientName: string;
  orderStatus: string;
  paymentMethod: string;
  itens: Item[];
};

export type ItensIds = {
  id: number;
};

export type ItemSimple = {
  id: number;
  name: string;
  paidPrice: number;
  quantity: number;
};
