import { Sequelize } from "sequelize-typescript";
import InvoiceFacadeFactory from "../factory/invoice.facade.factory";
import { InvoiceModel } from "../repository/invoice.model";
import { InvoiceItemModel } from "../repository/invoice-item.model";
import { GenerateInvoiceFacadeInputDto } from "./invoice.facade.interface";

describe("InvoiceFacade test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([InvoiceModel, InvoiceItemModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should generate an invoice", async () => {
    const facade = InvoiceFacadeFactory.create();

    const input: GenerateInvoiceFacadeInputDto = {
      id: "1",
      name: "John Doe",
      document: "123456789",
      number: "08123456789",
      state: "DKI Jakarta",
      street: "Jl. Jendral Sudirman",
      zipCode: "12345",
      city: "Jakarta",
      complement: "Jl. Jendral Sudirman",
      items: [
        {
          id: "1",
          price: 100,
          name: "item 1",
        },
        {
          id: "2",
          price: 200,
          name: "item 2",
        },
      ],
    };

    const output = await facade.generateInvoice(input);

    expect(output.id).toBe(input.id);
    expect(output.city).toBe(input.city);
    expect(output.complement).toBe(input.complement);
    expect(output.number).toBe(input.number);
    expect(output.state).toBe(input.state);
    expect(output.street).toBe(input.street);
    expect(output.zipCode).toBe(input.zipCode);
  });

  it("should find an invoice", async () => {
    const facade = InvoiceFacadeFactory.create();

    const input: GenerateInvoiceFacadeInputDto = {
      id: "1",
      name: "John Doe",
      document: "123456789",
      number: "08123456789",
      state: "DKI Jakarta",
      street: "Jl. Jendral Sudirman",
      zipCode: "12345",
      city: "Jakarta",
      complement: "Jl. Jendral Sudirman",
      items: [
        {
          id: "1",
          price: 100,
          name: "item 1",
        },
        {
          id: "2",
          price: 200,
          name: "item 2",
        },
      ],
    };

    await facade.generateInvoice(input);

    const output = await facade.findInvoice({ id: "1" });

    expect(output.id).toBe(input.id);
    expect(output.city).toBe(input.city);
    expect(output.complement).toBe(input.complement);
    expect(output.number).toBe(input.number);
    expect(output.state).toBe(input.state);
    expect(output.street).toBe(input.street);
    expect(output.zipCode).toBe(input.zipCode);
  });
});
