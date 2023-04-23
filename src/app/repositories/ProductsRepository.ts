import { Product } from "@domain/entities/Product";

export interface ProductsRepository {
  getById(id: string): Promise<Product | null>;
  create(props: {
    name: string;
    description: string;
    price: number;
    category: string;
    subcategory: string;
    quantity: number;
  }): Promise<Product>;
  update(
    id: string,
    props: {
      name: string;
      description: string;
      price: number;
      category: string;
      subcategory: string;
      quantity: number;
    }
  ): Promise<void>;
  delete(id: string): Promise<void>;
  deleteAll(): Promise<void>;
  fromJson(json: string): Promise<Product>;
}
