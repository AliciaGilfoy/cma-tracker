import express from "express";
import BaseController from "../utils/BaseController";
import { tasksService } from "../services/TasksService";
import auth0Provider from "@bcwdev/auth0provider";

export class TasksController extends BaseController {


  constructor() {
    super("api/tasks");
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
      let data = await tasksService.getById(req.params.id)
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }
  async getAll(req, res, next) {
    try {
      let data = await tasksService.getAll()
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }
  async create(req, res, next) {
    try {
      let data = await tasksService.create(req.userInfo.email, req.body)
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }
  async edit(req, res, next) {
    try {
      let data = await tasksService.edit(req.params.id, req.userInfo.email, req.body)
      return res.send(data)
    } catch (error) {
      next(error);
    }
  }

  async deleteById(req, res, next) {
    try {
      let data = await tasksService.deleteById(req.params.id, req.userInfo.email)
      return res.send("Sucessfully deleted")
    } catch (error) {
      next(error);
    }
  }
}