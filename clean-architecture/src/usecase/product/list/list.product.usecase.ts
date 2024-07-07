import type ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import type { OutputListProductDto } from "./list.product.dto";


export default class FindProductUseCase {
  constructor(private productRepository: ProductRepositoryInterface) {
    this.productRepository = productRepository
  }

  async execute(): Promise<OutputListProductDto> {
    const products = await this.productRepository.findAll();

    return products;
  }
}3