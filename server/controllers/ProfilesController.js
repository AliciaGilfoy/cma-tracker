import express from "express";
import BaseController from "../utils/BaseController";
import auth0Provider from "@bcwdev/auth0provider";
import { profilesService } from "../services/ProfilesService";
import { studentsService } from "../services/StudentsService";
import { redeamedsService } from "../services/RedeamedsService";

export class ProfilesController extends BaseController {

  constructor() {
    super("api/profile");
    this.router
      .use(auth0Provider.getAuthorizedUserInfo)
      .get("", this.getUserProfile)
      .get("/:id/students", this.getStudentsByProfileEmail)
      .get("/:id/redeamed", this.getRedeamedByProfileEmail)
      .put("/:id", this.edit);
  }
  async getUserProfile(req, res, next) {
    try {
      let profile = await profilesService.getProfile(req.userInfo);
      res.send(profile);
    } catch (error) {
      next(error);
    }
  }

  async getStudentsByProfileEmail(req, res, next) {
    try {
      let profile = await studentsService.getStudentsByProfileEmail(req.userInfo.email);
      res.send(profile);
    } catch (error) {
      next(error);
    }
  }

  async getRedeamedByProfileEmail(req, res, next) {
    try {
      let profile = await redeamedsService.getRedeamedByProfileEmail(req.userInfo.email);
      res.send(profile);
    } catch (error) {
      next(error);
    }
  }
  async edit(req, res, next) {
    try {
      req.body.creatorId = req.user.sub;
      let data = await profilesService.updateProfile(req.userInfo, req.body)
      res.send(data);
    } catch (error) {
      next(error);
    }
  }
}
