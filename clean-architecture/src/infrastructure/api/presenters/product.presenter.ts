import { toXML } from "jstoxml";
import { OutputListProductDto } from "../../../usecase/product/list/list.product.dto";

export default class ProductPresenter {
  static listJSON(data: OutputListProductDto): string {
    return JSON.stringify(data.map((product) => ({
      id: product.id,
      name: product.name,
      price: product.price,
    })));
  }
  static listXML(data: OutputListProductDto): string {
    const xmlOption = {
      header: true,
      indent: "  ",
      newline: "\n",
      allowEmpty: true,
    };

    return toXML(
      {
        products: {
          product: data.map((product) => ({
            id: product.id,
            name: product.name,
            price: product.price,
          })),
        },
      },
      xmlOption
    );
  }
}
