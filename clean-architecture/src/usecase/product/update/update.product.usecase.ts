import type ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import type { InputUpdateProductDto, OutputUpdateProductDto } from "./update.product.dto";


export default class UpdateProductUseCase {
  constructor(private productRepository: ProductRepositoryInterface) {
    this.productRepository = productRepository
  }

  async execute(input: InputUpdateProductDto): Promise<OutputUpdateProductDto> {
    const product = await this.productRepository.find(input.id);

    if (input.name) {
      product.changeName(input.name);
    }
    if (input.price) {
      product.changePrice(input.price);
    }

    await this.productRepository.update(product);


    const output: OutputUpdateProductDto = {
      id: product.id,
      name: product.name,
      price: product.price,
    };

    return output;
  }
}3