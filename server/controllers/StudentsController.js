import express from "express";
import BaseController from "../utils/BaseController";
import { studentsService } from "../services/StudentsService";
import auth0Provider from "@bcwdev/auth0provider";
import { redeamedsService } from "../services/RedeamedsService";

export class StudentsController extends BaseController {

  constructor() {
    super("api/students");
    this.router
      .use(auth0Provider.getAuthorizedUserInfo)
      .get("/:id", this.getById)
      .get("", this.getAll)
      .get("/:id/prizes", this.getRedeamedByStudentId)
      .post("", this.create)
      .put("/:id", this.addPoints)
      .put("/:id/challenge", this.addChallenge)
      .put("/:id/spend", this.spendPoints)
      .put("/:id/edit", this.editName)
      .delete("", this.deleteAll)
      .delete("/:id", this.deleteById)

  }
  async getAll(req, res, next) {
    try {
      let data = await studentsService.getAll()
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      let data = await studentsService.getById(req.params.id, req.userInfo.email)
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }


  async getRedeamedByStudentId(req, res, next) {
    try {
      let data = await redeamedsService.getRedeamedByStudentId(req.params.id, req.userInfo.email)
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }
  async create(req, res, next) {
    try {
      req.body.profileEmail = req.userInfo.email
      let data = await studentsService.create(req.body)
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }

  async addPoints(req, res, next) {
    try {
      let data = await studentsService.addPoints(req.params.id, req.body)
      return res.send(data)
    } catch (error) {
      next(error);
    }
  }

  async spendPoints(req, res, next) {
    try {
      let data = await studentsService.spendPoints(req.params.id, req.userInfo.email, req.body)
      return res.send(data)
    } catch (error) {
      next(error);
    }
  }

  async addChallenge(req, res, next) {
    try {
      let data = await studentsService.addChallenge(req.params.id, req.userInfo.email, req.body)
      return res.send(data)
    } catch (error) {
      next(error);
    }
  }
  async editName(req, res, next) {
    try {
      let data = await studentsService.editName(req.params.id, req.userInfo.email, req.body)
      return res.send(data)
    } catch (error) {
      next(error);
    }
  }
  async deleteById(req, res, next) {
    try {
      let data = await studentsService.deleteById(req.params.id, req.userInfo.email)
      return res.send("Sucessfully deleted")
    } catch (error) {
      next(error);
    }
  }

  async deleteAll(req, res, next) {
    try {
      let data = await studentsService.deleteAll(req.userInfo.email)
      res.send("Sucessfully deleted")
    } catch (error) {
      next(error);
    }
  }
}
