import { expect } from "chai";
import { beforeEach, describe, it } from "mocha";
import { Product } from "../src/domain/entities/Product";
import { InMemoryProductsRepository } from "./repositories/in-memory-products-repositories";

describe("The customer manipulating the product", () => {
  let products: InMemoryProductsRepository;
  const PRODUCT = {
    name: "Earphones",
    description: "",
    price: 0,
    category: "",
    subcategory: "",
    quantity: 0,
  };

  const { name, description, price, category, subcategory, quantity } = PRODUCT;

  beforeEach(async () => {
    products = new InMemoryProductsRepository();
    products.products = [];
    await products.create({
      name,
      description,
      price,
      category,
      subcategory,
      quantity,
    });
  });

  it("should be able to create a product with default id", async () => {
    const product = await products.getById(products.products[0].id);
    expect(product).to.be.instanceOf(Product);
  });

  it("should be able to create a product with custom id", async () => {
    const customId = "123";
    await products.create({
      name,
      description,
      price,
      category,
      subcategory,
      quantity,
      id: customId,
    });
    const product = await products.getById(customId);
    const productId = product?.id;

    expect(product).to.be.instanceOf(Product);
    expect(productId).to.equal("123");
  });

  it("should be able to access product props", async () => {
    await products.create({
      name,
      description,
      price,
      category,
      subcategory,
      quantity,
    });

    const product = products.products[0];

    expect(product.name).to.equal("Earphones");
    expect(product.description).to.equal("");
    expect(product.price).to.equal(0);
    expect(product.category).to.equal("");
    expect(product.subcategory).to.equal("");
    expect(product.quantity).to.equal(0);
  });

  it("should be able to update product props", async () => {
    const updateProps = {
      name: "E400",
      description: "Android",
      price: 350,
      category: "Electronics",
      subcategory: "Smartphones",
      quantity: 5,
    };
    const productId = products.products[0].id;

    await products.update(productId, updateProps);
    const updatedProduct = await products.getById(productId);

    expect(updatedProduct).to.deep.include(updateProps);
  });

  it("should be able to delete product", async () => {
    await products.create({
      name,
      description,
      price,
      category,
      subcategory,
      quantity,
    });
    const productId = products.products[0].id;

    await products.delete(productId);
    const product = await products.getById(productId);

    expect(product).to.be.null;
  });

  it("should be able to serialize and deserialize a product", async () => {
    const productId = products.products[0].id;
    const product = await products.getById(productId);

    const serializedProduct = JSON.stringify(product);
    const deserializedProduct = await products.fromJson(serializedProduct);

    expect(deserializedProduct).to.be.instanceOf(Product);
  });
});
