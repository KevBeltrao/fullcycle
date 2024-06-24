import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import ProductCreatedEvent from "../customer-created.event";

export default class SendConsoleLogHandler
  implements EventHandlerInterface<ProductCreatedEvent>
{
  handle(event: ProductCreatedEvent): void {
    const { id, nome, endereco } = event.eventData;
    console.log(`Endereço do cliente: ${id}, ${nome} alterado para: ${endereco}`); 
  }
}
