import BaseEntity from "../../@shared/domain/entity/base.entity";
import AggregateRoot from "../../@shared/domain/entity/aggregate-root.interface";
import Id from "../../@shared/domain/value-object/id.value-object";
import InvoiceItem from "./invoice-item.entity";
import Address from "../../@shared/domain/value-object/address";

export type InvoiceProps = {
  id?: Id;
  name: string;
  document: string;
  city: string;
  complement: string;
  number: string;
  state: string;
  street: string;
  zipCode: string;
  items: {
    id: string;
    name: string;
    price: number;
  }[];
  createdAt?: Date;
  updatedAt?: Date;
};

export default class Invoice extends BaseEntity implements AggregateRoot {
  private _name: string;
  private _document: string;
  private _address: Address;
  private _items: InvoiceItem[];

  constructor(props: InvoiceProps) {
    super(props.id);
    this._name = props.name;
    this._document = props.document;
    this._address = new Address(props.street, props.number, props.complement, props.city, props.state, props.zipCode);
    this._items = props.items.map((item) => new InvoiceItem({
      id: new Id(item.id),
      name: item.name,
      price: item.price,
    }));
  }

  get name(): string {
    return this._name;
  }

  get document(): string {
    return this._document;
  }

  get address(): Address {
    return this._address;
  }

  get items(): InvoiceItem[] {
    return this._items;
  }

  get total(): number {
    return this._items.reduce((sum, item) => sum + item.price, 0);
  }
}
