import ProductFactory from "../../../domain/product/factory/product.factory";
import type ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import type { InputCreateProductDto, OutputCreateProductDto } from "./create.product.dto";

export default class CreateProductUseCase {
  constructor(private productRepository: ProductRepositoryInterface) {
    this.productRepository = productRepository
  }

  async execute(input: InputCreateProductDto): Promise<OutputCreateProductDto> {
    const product = ProductFactory.create(input.type, input.name, input.price);
    await this.productRepository.create(product);

    const output: OutputCreateProductDto = {
      id: product.id,
      name: product.name,
      price: product.price,
    };

    return output;
  }
}
