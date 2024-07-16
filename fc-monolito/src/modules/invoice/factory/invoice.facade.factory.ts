import InvoiceFacade from "../facade/invoice.facade";
import invoiceRepository from "../repository/invoice.repository";
import FindInvoiceUseCase from "../usecase/find-invoice/find-invoice.usecase";
import GenerateInvoiceUseCase from "../usecase/generate-invoice/generate-invoice.usecase";

class InvoiceFacadeFactory {
  static create() {
    const repository = new invoiceRepository();
    const generateUseCase = new GenerateInvoiceUseCase(repository);
    const findUseCase = new FindInvoiceUseCase(repository);
    const facade = new InvoiceFacade({
      generateUsecase: generateUseCase,
      findUsecase: findUseCase,
    });

    return facade;
  }
}

export default InvoiceFacadeFactory;
