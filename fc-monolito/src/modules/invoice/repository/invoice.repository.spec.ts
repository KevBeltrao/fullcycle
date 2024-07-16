import { Sequelize } from "sequelize-typescript";
import { InvoiceItemModel } from "./invoice-item.model";
import { InvoiceModel } from "./invoice.model";
import InvoiceRepository from "./invoice.repository";
import Id from "../../@shared/domain/value-object/id.value-object";
import Invoice from "../domain/invoice.entity";

describe("InvoiceRepository", () => {
  let sequelize: Sequelize;

  beforeAll(async () => {
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
    const invoiceRepository = new InvoiceRepository();
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

    const input = new Invoice({
      id: new Id("1"),
      name: "Invoice 1",
      city: "city",
      complement: "complement",
      number: "number",
      state: "state",
      street: "street",
      zipCode: "zipCode",
      document: "123456789",
      items: [item1, item2],
    });

    await invoiceRepository.generate(input);

    const result = await InvoiceModel.findOne({
      where: { id: input.id.id },
      include: [{ model: InvoiceItemModel }],
    });

    expect(result).toBeDefined();
    expect(result.id).toBe(input.id.id);
    expect(result.name).toBe(input.name);
    expect(result.document).toBe(input.document);
    expect(result.city).toBe(input.address.city);
    expect(result.complement).toBe(input.address.complement);
    expect(result.number).toBe(input.address.number);
    expect(result.state).toBe(input.address.state);
    expect(result.street).toBe(input.address.street);
    expect(result.zipCode).toBe(input.address.zipCode);

    const items = await InvoiceItemModel.findAll({
      where: { invoice_id: input.id.id },
    });

    expect(items).toHaveLength(2);

    items.forEach((item, index) => {
      expect(item.id).toBe(input.items[index].id.id);
      expect(item.name).toBe(input.items[index].name);
      expect(item.price).toBe(input.items[index].price);
    });
  });
});