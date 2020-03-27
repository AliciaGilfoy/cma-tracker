import express from "express";
import BaseController from "../utils/BaseController";
import { challengesService } from "../services/ChallengesService";
import auth0Provider from "@bcwdev/auth0provider";

export class ChallengesController extends BaseController {


  constructor() {
    super("api/challenges");
    this.router
      .get("", this.getAll)
      .use(auth0Provider.getAuthorizedUserInfo)
      .get("/:id", this.getById)
      .post("", this.create)
      .put("/:id", this.edit)
      .delete("/:id", this.deleteById)

  }

  async getById(req, res, next) {
    try {
      let data = await challengesService.getById(req.params.id)
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }
  async getAll(req, res, next) {
    try {
      let data = await challengesService.getAll()
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }
  async create(req, res, next) {
    try {
      let data = await challengesService.create(req.userInfo.email, req.body)
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }
  async edit(req, res, next) {
    try {
      let data = await challengesService.edit(req.params.id, req.userInfo.email, req.body)
      return res.send(data)
    } catch (error) {
      next(error);
    }
  }

  async deleteById(req, res, next) {
    try {
      let data = await challengesService.deleteById(req.params.id, req.userInfo.email)
      return res.send("Sucessfully deleted")
    } catch (error) {
      next(error);
    }
  }
}