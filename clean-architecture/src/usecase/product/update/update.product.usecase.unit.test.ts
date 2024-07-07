import type ProductInterface from "../../../domain/product/entity/product.interface";
import type { InputUpdateProductDto } from "./update.product.dto";
import UpdateProductUseCase from "./update.product.usecase";

describe("UpdateProductUseCase", () => {
  it("should create a product", async () => {
    const changeNameMock = jest.fn();
    const changePriceMock = jest.fn();

    const product: ProductInterface = {
      id: "1",
      name: "Product A",
      price: 100,
      changeName: changeNameMock,
      changePrice: changePriceMock,
    };

    const productRepository = {
      create: jest.fn(),
      update: jest.fn(),
      find: jest.fn().mockResolvedValue(product),
      findAll: jest.fn(),
    };

    const updateProductUseCase = new UpdateProductUseCase(productRepository);

    const input: InputUpdateProductDto = {
      id: "1",
      name: "Product A!!!",
      price: 80,
    };

    await updateProductUseCase.execute(input);
    
    expect(productRepository.update).toBeCalledTimes(1);
    expect(changeNameMock).toBeCalledTimes(1);
    expect(changeNameMock).toBeCalledWith(input.name);
    expect(changePriceMock).toBeCalledTimes(1);
    expect(changePriceMock).toBeCalledWith(input.price);
  });
});
