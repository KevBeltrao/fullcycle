import { Sequelize } from "sequelize-typescript";
import FindProductUseCase from "./find.product.usecase";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import Product from "../../../domain/product/entity/product";

describe("FindProductUseCase Integration", () => {
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

  it("should find a product", async () => {
    const product = new Product("1", "Product 1", 100);

    await ProductModel.create({
      id: product.id,
      name: product.name,
      price: product.price,
    });

    const productRepository = new ProductRepository();
    const usecase = new FindProductUseCase(productRepository);
  
      const input = {
        id: "1",
      };

    const output = await usecase.execute(input);

    expect(output.id).toBe(product.id);
    expect(output.name).toBe(product.name);
    expect(output.price).toBe(product.price);
  });
});
