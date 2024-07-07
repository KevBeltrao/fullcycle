import { Sequelize } from "sequelize-typescript";
import ListProductUseCase from "./list.product.usecase";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import Product from "../../../domain/product/entity/product";

describe("ListProductUseCase Integration", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should list all products", async () => {
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

    const productRepository = new ProductRepository();
    const usecase = new ListProductUseCase(productRepository);
  
    const output = await usecase.execute();

    expect(output).toHaveLength(2);
    
    expect(output[0].id).toBe(product1.id);
    expect(output[0].name).toBe(product1.name);
    expect(output[0].price).toBe(product1.price);

    expect(output[1].id).toBe(product2.id);
    expect(output[1].name).toBe(product2.name);
    expect(output[1].price).toBe(product2.price);
  });
});
