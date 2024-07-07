import express, { Request, Response } from "express";
import ProductRepository from "../../product/repository/sequelize/product.repository";
import ListProductUseCase from "../../../usecase/product/list/list.product.usecase";
import ProductPresenter from "../presenters/product.presenter";
import CreateProductUseCase from "../../../usecase/product/create/create.product.usecase";

export const productRoute = express.Router();

productRoute.get("/", async (req: Request, res: Response) => {
  const useCase = new ListProductUseCase(new ProductRepository());
  const output = await useCase.execute();

  res.format({
    json: () => res.send(ProductPresenter.listJSON(output)),
    xml: () => res.send(ProductPresenter.listXML(output)),
  });
});

productRoute.post("/", async (req: Request, res: Response) => {
  const useCase = new CreateProductUseCase(new ProductRepository());

  try {
    const output = await useCase.execute(req.body);
    res.format({
      json: () => res.status(201).send(ProductPresenter.createJSON(output)),
      xml: () => res.status(201).send(ProductPresenter.createXML(output)),
    });
  } catch (err) {
    res.status(500).send(err);
  }
});
