import express, { Request, Response } from "express";
import ProductRepository from "../../product/repository/sequelize/product.repository";
import ListProductUseCase from "../../../usecase/product/list/list.product.usecase";
import ProductPresenter from "../presenters/product.presenter";

export const productRoute = express.Router();

productRoute.get("/", async (req: Request, res: Response) => {
  const usecase = new ListProductUseCase(new ProductRepository());
  const output = await usecase.execute();

  res.format({
    json: async () => res.send(ProductPresenter.listJSON(output)),
    xml: async () => res.send(ProductPresenter.listXML(output)),
  });
});
