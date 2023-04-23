import { ProductsRepository } from "../../src/app/repositories/ProductsRepository";
import { Product } from "../../src/domain/entities/Product";

export class InMemoryProductsRepository implements ProductsRepository {
  products: Product[] = [];

  constructor() {
    this.products = [];
  }

  async getById(id: string): Promise<Product | null> {
    const product = this.products.find((p) => p?.id === id);

    if (!product) {
      return null;
    }

    return Promise.resolve(product);
  }
  async create(props: {
    name: string;
    description: string;
    price: number;
    category: string;
    subcategory: string;
    quantity: number;
    id?: string;
  }): Promise<Product> {
    const id = props.id;
    const product = await new Product(
      {
        ...props,
      },
      id
    );
    this.products.push(product);
    return Promise.resolve(product);
  }

  async update(
    id: string,
    props: {
      name: string;
      description: string;
      price: number;
      category: string;
      subcategory: string;
      quantity: number;
    }
  ): Promise<void> {
    const product = await this.getById(id);
    if (!product) {
      throw new Error("Product not found");
    }
    Object.assign(product, props);
  }

  async delete(id: string): Promise<void> {
    const product = await this.getById(id);
    if (!product) {
      throw new Error("Product not found");
    }

    const index = this.products.findIndex((p) => p?.id === id);
    if (index !== -1) {
      this.products.splice(index, 1);
    }
  }

  async deleteAll(): Promise<void> {
    this.products = [];
  }

  async fromJson(json: string): Promise<Product> {
    const props = JSON.parse(json);
    const product = await this.create({
      name: props.name,
      description: props.description,
      price: props.price,
      category: props.category,
      subcategory: props.subcategory,
      quantity: props.quantity,
      id: props.id,
    });
    return Promise.resolve(product);
  }
}
