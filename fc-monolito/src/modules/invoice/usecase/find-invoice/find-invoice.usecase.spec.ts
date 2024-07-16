import Id from "../../../@shared/domain/value-object/id.value-object";
import Invoice from "../../domain/invoice.entity";
import InvoiceGateway from "../../gateway/invoice.gateway";
import FindInvoiceUseCase from "./find-invoice.usecase";

const invoice = new Invoice({
  id: new Id("1"),
  name: "Product 1",
  document: "123456789",
  street: "Street",
  number: "123",
  complement: "Complement",
  city: "City",
  state: "State",
  zipCode: "12345678",
  items: [
    {
      id: "1",
      name: "Product 1",
      price: 100,
    },
    {
      id: "2",
      name: "Product 2",
      price: 50,
    },
  ]
})

const MockRepository = (): InvoiceGateway => {
  return {
    generate: jest.fn(),
    find: jest.fn().mockResolvedValue(invoice),
  };
};

describe("Generate Invoice usecase unit test", () => {
  it("should generate an invoice", async () => {
    const invoiceRepository = MockRepository();
    const usecase = new FindInvoiceUseCase(invoiceRepository);

    const result = await usecase.execute({ id: "1" });

    expect(result).toEqual({
      id: "1",
      name: "Product 1",
      document: "123456789",
      street: "Street",
      number: "123",
      complement: "Complement",
      city: "City",
      state: "State",
      total: 150,
      zipCode: "12345678",
      items: [
        {
          id: "1",
          name: "Product 1",
          price: 100,
        },
        {
          id: "2",
          name: "Product 2",
          price: 50,
        },
      ]
    });
  });
});
