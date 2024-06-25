import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import CustomerCreatedEvent from "../customer-created.event";

export default class SendConsoleLogHandler
  implements EventHandlerInterface<CustomerCreatedEvent>
{
  handle(event: CustomerCreatedEvent): void {
    const { id, name, Address } = event.eventData;
    console.log(`Endereço do cliente: ${id}, ${name} alterado para: ${Address}`); 
  }
}
