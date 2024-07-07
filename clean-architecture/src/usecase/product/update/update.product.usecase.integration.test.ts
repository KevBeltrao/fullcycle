import { Sequelize } from "sequelize-typescript";
import UpdateProductUseCase from "./update.product.usecase";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import Product from "../../../domain/product/entity/product";

describe("UpdateProductUseCase Integration", () => {
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

  it("updates a product", async () => {
    const product = new Product("1", "Product 1", 100);

    await ProductModel.create({
      id: product.id,
      name: product.name,
      price: product.price,
    });

    const productRepository = new ProductRepository();
    const usecase = new UpdateProductUseCase(productRepository);
  
      const input = {
        id: "1",
        name: "Product 1!!!",
        price: 80,
      };

    const output = await usecase.execute(input);

    expect(output.id).toBe(input.id);
    expect(output.name).toBe(input.name);
    expect(output.price).toBe(input.price);
  });
});
