import ListProductUseCase from "./list.product.usecase";

describe("ListProductUseCase", () => {
  const mockedProducts = [
    {
      id: "1",
      name: "Product A",
      price: 100,
    },
    {
      id: "1",
      name: "Product A",
      price: 100,
    },
  ];

  const findAllMock = jest.fn().mockReturnValue(mockedProducts);

  it("should find a product", async () => {
    const productRepository = {
      create: jest.fn(),
      update: jest.fn(),
      find: jest.fn(),
      findAll: findAllMock,
    };

    const listProductUseCase = new ListProductUseCase(productRepository);

    const output = await listProductUseCase.execute();

    expect(findAllMock).toBeCalledTimes(1);
    expect(output).toBe(mockedProducts);
  });
});
