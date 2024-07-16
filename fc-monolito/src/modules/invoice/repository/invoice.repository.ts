import Id from "../../@shared/domain/value-object/id.value-object";
import Invoice from "../domain/invoice.entity";
import InvoiceGateway from "../gateway/invoice.gateway";
import { InvoiceItemModel } from "./invoice-item.model";
import { InvoiceModel } from "./invoice.model";

class invoiceRepository implements InvoiceGateway {
  generate = async (product: Invoice): Promise<void> => {
    await InvoiceModel.create({
      id: product.id.id,
      name: product.name,
      document: product.document,
      city: product.address.city,
      complement: product.address.complement,
      number: product.address.number,
      state: product.address.state,
      street: product.address.street,
      zipCode: product.address.zipCode,
      items: product.items.map((item) => ({
        id: item.id.id,
        name: item.name,
        price: item.price,
      })),
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    }, {
      include: [{ model: InvoiceItemModel }],
    });
  };

  find = async (id: string): Promise<Invoice> => {
    const existingInvoice = await InvoiceModel.findOne({
      where: { id },
      include: [{ model: InvoiceItemModel }],
    });

    if (!existingInvoice) {
      throw new Error("Invoice not found");
    }

    return new Invoice({
      id: new Id(existingInvoice.id),
      name: existingInvoice.name,
      document: existingInvoice.document,
      city: existingInvoice.city,
      complement: existingInvoice.complement,
      number: existingInvoice.number,
      state: existingInvoice.state,
      street: existingInvoice.street,
      zipCode: existingInvoice.zipCode,
      items: existingInvoice.items.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
      })),
      createdAt: existingInvoice.createdAt,
      updatedAt: existingInvoice.updatedAt,
    });
  }
}

export default invoiceRepository;
