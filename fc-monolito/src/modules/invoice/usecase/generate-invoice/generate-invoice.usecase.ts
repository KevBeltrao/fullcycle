import Id from "../../../@shared/domain/value-object/id.value-object";
import Invoice, { InvoiceProps } from "../../domain/invoice.entity";
import InvoiceGateway from "../../gateway/invoice.gateway";
import { GenerateInvoiceInputDto, GenerateInvoiceOutputDto } from "./generate-invoice.dto";

export default class GenerateInvoiceUseCase {
  private _InvoiceRepository: InvoiceGateway;

  constructor(_InvoiceRepository: InvoiceGateway) {
    this._InvoiceRepository = _InvoiceRepository;
  }

  async execute(input: GenerateInvoiceInputDto): Promise<GenerateInvoiceOutputDto> {
    const props: InvoiceProps = {
      id: new Id(input.id),
      name: input.name,
      document: input.document,
      city: input.city,
      complement: input.complement,
      number: input.number,
      state: input.state,
      street: input.street,
      zipCode: input.zipCode,
      items: input.items,
    };

    const product = new Invoice(props);
    await this._InvoiceRepository.generate(product);

    return {
      id: product.id.id,
      name: product.name,
      city: product.address.city,
      complement: product.address.complement,
      number: product.address.number,
      state: product.address.state,
      street: product.address.street,
      zipCode: product.address.zipCode,
      document: product.document,
      items: product.items.map((item) => ({
        id: item.id.id,
        name: item.name,
        price: item.price,
      })),
      total: product.total,
    };
  }
}
