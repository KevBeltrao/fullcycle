import ProductFactory from "../../../domain/product/factory/product.factory";
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputFindProductDto, OutputFindProductDto } from "./find.product.dto";


export default class FindProductUseCase {
  constructor(private productRepository: ProductRepositoryInterface) {
    this.productRepository = productRepository
  }

  async execute(input: InputFindProductDto): Promise<OutputFindProductDto> {
    const productFound = await this.productRepository.find(input.id);

    const output: OutputFindProductDto = {
      id: productFound.id,
      name: productFound.name,
      price: productFound.price,
    };

    return output;
  }
}3