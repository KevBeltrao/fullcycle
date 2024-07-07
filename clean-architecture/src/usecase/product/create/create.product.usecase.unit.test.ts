import CreateProductUseCase from "./create.product.usecase";

describe("CreateProductUseCase", () => {
  it("should create a product", async () => {
    const productRepository = {
      create: jest.fn(),
      update: jest.fn(),
      find: jest.fn(),
      findAll: jest.fn(),
    };

    const createProductUseCase = new CreateProductUseCase(productRepository);

    const input = {
      type: "a",
      name: "Product A",
      price: 100,
    } as const;

    const output = await createProductUseCase.execute(input);
    
    expect(productRepository.create).toBeCalledTimes(1);
    expect(output.id).toEqual(expect.any(String));
    expect(output.name).toEqual("Product A");
    expect(output.price).toEqual(100);
  });
});
