import Product from "../../../domain/product/entity/product";
import ProductModel from "../../product/repository/sequelize/product.model";
import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for product", () => {
  beforeEach(async () => {
    sequelize.addModels([ProductModel]);
    await sequelize.sync({ force: true,  });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should list all product", async () => {
    const product1 = new Product("1", "Product 1", 100);
    await ProductModel.create({
      id: product1.id,
      name: product1.name,
      price: product1.price,
    });

    const product2 = new Product("2", "Product 2", 200);
    await ProductModel.create({
      id: product2.id,
      name: product2.name,
      price: product2.price,
    });

    const response = await request(app).get("/product");

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2);
    console.log('response.body');
    console.log('response.body');
    console.log('response.body');
    console.log('response.body');
    console.log('response.body');
    console.log('response.body');
    console.log('response.body');
    console.log('response.body');
    console.log(response.body);
    expect(response.body[0].id).toBe(product1.id);
    expect(response.body[0].name).toBe(product1.name);
    expect(response.body[0].price).toBe(product1.price);
    expect(response.body[1].id).toBe(product2.id);
    expect(response.body[1].name).toBe(product2.name);
    expect(response.body[1].price).toBe(product2.price);
  });
});
