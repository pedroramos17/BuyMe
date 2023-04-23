import { Entity } from "@core/domain/Entity";

interface ProductProps {
  name: string;
  description: string;
  price: number;
  category: string;
  subcategory: string;
  quantity: number;
}

export class Product extends Entity<ProductProps> {
  constructor(props: ProductProps, id?: string) {
    super(props, id);
  }

  get id(): string {
    return this._id;
  }

  set id(id: string) {
    this.id = id;
  }

  get name(): string {
    return this.props.name;
  }

  set name(name: string) {
    this.props.name = name;
  }

  get description(): string {
    return this.props.description;
  }

  set description(description: string) {
    this.props.description = description;
  }

  get price(): number {
    return this.props.price;
  }

  set price(price: number) {
    this.props.price = price;
  }

  get category(): string {
    return this.props.category;
  }

  set category(category: string) {
    this.props.category = category;
  }

  get subcategory(): string {
    return this.props.subcategory;
  }

  set subcategory(subcategory: string) {
    this.props.subcategory = subcategory;
  }

  get quantity(): number {
    return this.props.quantity;
  }

  set quantity(quantity: number) {
    this.props.quantity = quantity;
  }
}
