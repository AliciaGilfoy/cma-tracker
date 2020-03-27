import express from "express";
import BaseController from "../utils/BaseController";
import { prizesService } from "../services/PrizesService";
import auth0Provider from "@bcwdev/auth0provider";

export class PrizesController extends BaseController {

  constructor() {
    super("api/prizes");
    this.router
      .use(auth0Provider.getAuthorizedUserInfo)
      .get("/:id", this.getById)
      .get("", this.getAll)
      .post("", this.create)
      .put("/:id", this.edit)
      .put("/:id/delete", this.deleteById)

  }

  async getById(req, res, next) {
    try {
      let data = await prizesService.getById(req.params.id)
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }
  async getAll(req, res, next) {
    try {
      let data = await prizesService.getAll()
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }
  async create(req, res, next) {
    try {
      let data = await prizesService.create(req.userInfo.email, req.body)
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }
  async edit(req, res, next) {
    try {
      let data = await prizesService.edit(req.params.id, req.userInfo.email, req.body)
      return res.send(data)
    } catch (error) {
      next(error);
    }
  }
  async deleteById(req, res, next) {
    try {
      let update = { "active": false }
      let data = await prizesService.deleteById(req.params.id, req.userInfo.email, update)
      return res.send("Sucessfully deleted")
    } catch (error) {
      next(error);
    }
  }
}