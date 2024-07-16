import InvoiceGateway from "../../gateway/invoice.gateway";
import { GenerateInvoiceInputDto } from "./generate-invoice.dto";
import GenerateInvoiceUseCase from "./generate-invoice.usecase";

const MockRepository = (): InvoiceGateway => {
  return {
    generate: jest.fn(),
    find: jest.fn(),
  };
};

describe("Generate Invoice usecase unit test", () => {
  it("should generate an invoice", async () => {
    const invoiceRepository = MockRepository();
    const usecase = new GenerateInvoiceUseCase(invoiceRepository);

    const item1 = {
      id: "1",
      name: "Product 1",
      price: 100,
    };

    const item2 = {
      id: "2",
      name: "Product 2",
      price: 50,
    };

    const input: GenerateInvoiceInputDto = {
      id: "1",
      name: "Product 1",
      city: "city",
      complement: "complement",
      number: "number",
      state: "state",
      street: "street",
      zipCode: "zipCode",
      document: "123456789",
      items: [item1, item2],
    };

    const result = await usecase.execute(input);

    expect(invoiceRepository.generate).toHaveBeenCalled();
    expect(result.id).toBeDefined();
    expect(result.name).toBe(input.name);
    expect(result.document).toBe(input.document);
    expect(result.city).toBe(input.city);
    expect(result.complement).toBe(input.complement);
    expect(result.number).toBe(input.number);
    expect(result.state).toBe(input.state);
    expect(result.street).toBe(input.street);
    expect(result.zipCode).toBe(input.zipCode);
    result.items.forEach((item, index) => {
      expect(item.id).toBe(input.items[index].id);
      expect(item.name).toBe(input.items[index].name);
      expect(item.price).toBe(input.items[index].price);
    });
    expect(result.total).toBe(150);
  });
});
