import FindProductUseCase from "./find.product.usecase";

describe("FindProductUseCase", () => {
  const findMock = jest.fn().mockReturnValue({
    id: "1",
    name: "Product A",
    price: 100,
  });

  it("should find a product", async () => {
    const productRepository = {
      create: jest.fn(),
      update: jest.fn(),
      find: findMock,
      findAll: jest.fn(),
    };

    const findProductUseCase = new FindProductUseCase(productRepository);

    const input = {
      id: "1"
    };

    const output = await findProductUseCase.execute(input);

    expect(findMock).toBeCalledTimes(1);
    expect(output.id).toEqual("1");
    expect(output.name).toEqual("Product A");
    expect(output.price).toEqual(100);
  });
});
