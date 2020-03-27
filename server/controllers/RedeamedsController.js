import express from "express";
import BaseController from "../utils/BaseController";
import { redeamedsService } from "../services/RedeamedsService";
import auth0Provider from "@bcwdev/auth0provider";

export class RedeamedsController extends BaseController {


  constructor() {
    super("api/redeameds");
    this.router
      .use(auth0Provider.getAuthorizedUserInfo)
      .get("/:id", this.getById)
      .get("", this.getAll)
      .post("", this.create)
      .put("/:id", this.edit)
      .put("/:id/complete", this.complete)
      .delete("/:id", this.deleteById)

  }

  async getById(req, res, next) {
    try {
      let data = await redeamedsService.getById(req.params.id)
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }
  async getAll(req, res, next) {
    try {
      let data = await redeamedsService.getAll(req.userInfo.email)
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }
  async create(req, res, next) {
    try {
      let data = await redeamedsService.create(req.body)
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }
  async edit(req, res, next) {
    try {
      let data = await redeamedsService.edit(req.params.id, req.userInfo.email, req.body)
      return res.send(data)
    } catch (error) {
      next(error);
    }
  }

  async complete(req, res, next) {
    try {
      req.body.completedBy = req.userInfo.email
      let data = await redeamedsService.complete(req.params.id, req.body.update)
      return res.send(data)
    } catch (error) {
      next(error);
    }
  }
  async deleteById(req, res, next) {
    try {
      let data = await redeamedsService.deleteById(req.params.id, req.userInfo.email)
      return res.send("Sucessfully deleted")
    } catch (error) {
      next(error);
    }
  }
}