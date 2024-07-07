import { Sequelize } from "sequelize-typescript";
import CreateProductUseCase from "./create.product.usecase";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";

describe("CreateProductUseCase Integration", () => {
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

  it("creates a product of type a", async () => {
    const productRepository = new ProductRepository();
    const usecase = new CreateProductUseCase(productRepository);

    const input = {
      name: "Product 1",
      price: 100,
      type: "a",
    } as const;

    const output = await usecase.execute(input);

    expect(output.id).toBeDefined();
    expect(output.name).toEqual(input.name);
    expect(output.price).toEqual(input.price);

    const product = await ProductModel.findOne({ where: { id: output.id } });

    expect(product.name).toEqual(output.name);
    expect(product.price).toEqual(output.price);
  });

  it("creates a product of type b", async () => {
    const productRepository = new ProductRepository();
    const usecase = new CreateProductUseCase(productRepository);

    const input = {
      name: "Product 1",
      price: 100,
      type: "b",
    } as const;

    const output = await usecase.execute(input);

    expect(output.id).toBeDefined();
    expect(output.name).toEqual(input.name);
    expect(output.price).toEqual(input.price * 2);

    const product = await ProductModel.findOne({ where: { id: output.id } });

    expect(product.name).toEqual(output.name);
    expect(product.price).toEqual(output.price);
  });
});
