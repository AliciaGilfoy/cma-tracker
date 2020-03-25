import express from "express";
import BaseController from "../utils/BaseController";
import { studentsService } from "../services/StudentsService";
import auth0Provider from "@bcwdev/auth0provider";

export class StudentsController extends BaseController {
  constructor() {
    super("api/students");
    this.router
      .post("", this.create)
      .put("/:name", this.addPoints)
      .get("/:name", this.getByName)
      .get("", this.getAll)
      .use(auth0Provider.getAuthorizedUserInfo)
  }
  async getAll(req, res, next) {
    try {
      let data = await studentsService.getAll()
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }

  async getByName(req, res, next) {
    try {
      let data = await studentsService.getByName(req.body)
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }
  async create(req, res, next) {
    try {
      let data = await studentsService.create(req.body)
      res.send(data);
    } catch (error) {
      next(error);
    }
  }

  async addPoints(req, res, next) {
    try {
      let data = await studentsService.addPoints(req.body)
      res.send(data)
    } catch (error) {

    }
  }
}
