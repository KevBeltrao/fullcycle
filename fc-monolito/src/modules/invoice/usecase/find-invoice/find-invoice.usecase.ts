import Id from "../../../@shared/domain/value-object/id.value-object";
import Invoice, { InvoiceProps } from "../../domain/invoice.entity";
import InvoiceGateway from "../../gateway/invoice.gateway";
import { FindInvoiceInputDto, FindInvoiceOutputDto } from "./find-invoice.dto";

export default class FindInvoiceUseCase {
  private _InvoiceRepository: InvoiceGateway;

  constructor(_InvoiceRepository: InvoiceGateway) {
    this._InvoiceRepository = _InvoiceRepository;
  }

  async execute(input: FindInvoiceInputDto): Promise<FindInvoiceOutputDto> {
    const output = await this._InvoiceRepository.find(input.id);

    return {
      id: output.id.id,
      name: output.name,
      city: output.address.city,
      complement: output.address.complement,
      number: output.address.number,
      state: output.address.state,
      street: output.address.street,
      zipCode: output.address.zipCode,
      document: output.document,
      items: output.items.map((item) => ({
        id: item.id.id,
        name: item.name,
        price: item.price,
      })),
      total: output.total,
    };
  }
}
