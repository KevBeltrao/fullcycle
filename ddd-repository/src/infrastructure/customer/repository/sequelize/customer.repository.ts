import { eventDispatchSingleton } from "../../../../domain/@shared/event/event-dispatcher";
import Customer from "../../../../domain/customer/entity/customer";
import CustomerCreatedEvent from "../../../../domain/customer/event/customer-created.event";
import SendConsoleLog1Handler from "../../../../domain/customer/event/handler/send-console-log-1-handler";
import SendConsoleLog2Handler from "../../../../domain/customer/event/handler/send-console-log-2-handler";
import SendConsoleLogHandler from "../../../../domain/customer/event/handler/send-console.log-handler";
import CustomerRepositoryInterface from "../../../../domain/customer/repository/customer-repository.interface";
import Address from "../../../../domain/customer/value-object/address";
import CustomerModel from "./customer.model";

const sendConsoleLog1Handler = new SendConsoleLog1Handler();
const sendConsoleLog2Handler = new SendConsoleLog2Handler();
eventDispatchSingleton.register('CustomerCreatedEvent', sendConsoleLog1Handler);
eventDispatchSingleton.register('CustomerCreatedEvent', sendConsoleLog2Handler);

const sendConsoleLogHandler = new SendConsoleLogHandler();
eventDispatchSingleton.register('CustomerAddressChangedEvent', sendConsoleLogHandler);

export default class CustomerRepository implements CustomerRepositoryInterface {
  async create(entity: Customer): Promise<void> {
    await CustomerModel.create({
      id: entity.id,
      name: entity.name,
      street: entity.Address.street,
      number: entity.Address.number,
      zipcode: entity.Address.zip,
      city: entity.Address.city,
      active: entity.isActive(),
      rewardPoints: entity.rewardPoints,
    });

    const customerCreatedEvent = new CustomerCreatedEvent(entity);
    eventDispatchSingleton.notify(customerCreatedEvent);
  }

  async update(entity: Customer): Promise<void> {
    await CustomerModel.update(
      {
        name: entity.name,
        street: entity.Address.street,
        number: entity.Address.number,
        zipcode: entity.Address.zip,
        city: entity.Address.city,
        active: entity.isActive(),
        rewardPoints: entity.rewardPoints,
      },
      {
        where: {
          id: entity.id,
        },
      }
    );
  }

  async find(id: string): Promise<Customer> {
    let customerModel;
    try {
      customerModel = await CustomerModel.findOne({
        where: {
          id,
        },
        rejectOnEmpty: true,
      });
    } catch (error) {
      throw new Error("Customer not found");
    }

    const customer = new Customer(id, customerModel.name);
    const address = new Address(
      customerModel.street,
      customerModel.number,
      customerModel.zipcode,
      customerModel.city
    );

    customer.changeAddress(address);

    return customer;
  }

  async findAll(): Promise<Customer[]> {
    const customerModels = await CustomerModel.findAll();

    const customers = customerModels.map((customerModels) => {
      let customer = new Customer(customerModels.id, customerModels.name);
      customer.addRewardPoints(customerModels.rewardPoints);
      const address = new Address(
        customerModels.street,
        customerModels.number,
        customerModels.zipcode,
        customerModels.city
      );

      customer.changeAddress(address);

      if (customerModels.active) {
        customer.activate();
      }
      return customer;
    });

    return customers;
  }
}
