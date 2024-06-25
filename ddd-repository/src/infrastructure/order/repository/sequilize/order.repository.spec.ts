import { Sequelize } from "sequelize-typescript";
import Order from "../../../../domain/checkout/entity/order";
import OrderItem from "../../../../domain/checkout/entity/order_item";
import Customer from "../../../../domain/customer/entity/customer";
import Address from "../../../../domain/customer/value-object/address";
import Product from "../../../../domain/product/entity/product";
import CustomerModel from "../../../customer/repository/sequelize/customer.model";
import CustomerRepository from "../../../customer/repository/sequelize/customer.repository";
import ProductModel from "../../../product/repository/sequelize/product.model";
import ProductRepository from "../../../product/repository/sequelize/product.repository";
import OrderItemModel from "./order-item.model";
import OrderModel from "./order.model";
import OrderRepository from "./order.repository";

describe("Order repository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    await sequelize.addModels([
      CustomerModel,
      OrderModel,
      OrderItemModel,
      ProductModel,
    ]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a new order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product("123", "Product 1", 10);
    await productRepository.create(product);

    const orderItem = new OrderItem(
      "1",
      product.name,
      product.price,
      product.id,
      2
    );

    const order = new Order("123", "123", [orderItem]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });

    expect(orderModel.toJSON()).toStrictEqual({
      id: "123",
      customer_id: "123",
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          order_id: "123",
          product_id: "123",
        },
      ],
    });
  });

  it("should update an order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product1 = new Product("123", "Product 1", 10);
    await productRepository.create(product1);
    const product2 = new Product("124", "Product 2", 20);
    await productRepository.create(product2);

    const orderItem1 = new OrderItem("1", product1.name, product1.price, product1.id, 2);
    const orderItem2 = new OrderItem("2", product2.name, product2.price, product2.id, 3);

    const order = new Order("123", "123", [orderItem1, orderItem2]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({ where: { id: "123" } });

    expect(orderModel.toJSON()).toStrictEqual({
        id: "123",
        customer_id: "123",
        total: 80,
    });

    const newOrderItem1 = new OrderItem("3", product1.name, product1.price, product1.id, 1);
    
    order.changeItems([newOrderItem1]);

    await orderRepository.update(order);

    const orderModel2 = await OrderModel.findOne({ where: { id: "123" } });

    expect(orderModel2.toJSON()).toStrictEqual({
      id: "123",
      customer_id: "123",
      total: 10,
    });
  });

  it("should find an order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product1 = new Product("123", "Product 1", 10);
    await productRepository.create(product1);

    const orderItem1 = new OrderItem("1", product1.name, product1.price, product1.id, 2);

    const order = new Order("123", "123", [orderItem1]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderFound = await orderRepository.find("123");

    expect(orderFound).toStrictEqual(order);
  });

  it("should find all orders", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 1, "Zipcode 1", "City 1");
    customer.changeAddress(address);
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product1 = new Product("123", "Product 1", 10);
    await productRepository.create(product1);

    const orderItem1 = new OrderItem("1", product1.name, product1.price, product1.id, 2);
    const order1 = new Order("123", "123", [orderItem1]);
    const orderItem2 = new OrderItem("2", product1.name, product1.price, product1.id, 1);
    const order2 = new Order("124", "123", [orderItem2]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order1);
    await orderRepository.create(order2);

    const ordersFound = await orderRepository.findAll();

    expect(ordersFound).toStrictEqual([order1, order2]);
  });
});
