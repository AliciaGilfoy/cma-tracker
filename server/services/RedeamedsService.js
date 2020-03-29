import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";

let approved = ["aliciagilfoy@gmail.com", "test@test.com", "amwalsh22@gmail.com", "mimiacya@gmail.com", "brettbittinger@championsmartialarts.win", "arianeheath@hotmail.com"]
class RedeamedsService {
  async getById(id) {
    let prize = await dbContext.Redeameds.findOne({ _id: id })
    if (!prize) {
      throw new BadRequest("Invalid ID or you do not have access to this prize")
    }
    return prize
  }

  async getRedeamedByProfileEmail(email) {
    let prizes = await dbContext.Redeameds.find({ profileEmail: email })
    if (!prizes) {
      throw new BadRequest("Invalid ID or you do not have access to this prize")
    }
    return prizes
  }
  async getAll(email) {
    if (approved.find(e => e == email)) {
      let query = {}
      let prizes = await dbContext.Redeameds.find(query)
      return prizes
    } else {
      return "You are not authorized"
    }
  }
  async create(body) {
    let prize = await dbContext.Redeameds.create(body)
    return prize
  }
  async edit(id, email, update) {
    if (approved.find(e => e == email)) {
      let prize = await dbContext.Redeameds.findOneAndUpdate({ _id: id, profileEmail: email }, update, { new: true })
      if (!prize) {
        throw new BadRequest("Invalid ID");
      }
      return prize;
    }
  }
  async complete(id, update) {
    let prize = await dbContext.Redeameds.findOneAndUpdate({ _id: id }, update, { new: true })
    if (!prize) {
      throw new BadRequest("Invalid ID");
    }
    return prize;
  }
  async deleteById(id, email) {
    if (approved.find(e => e == email)) {
      let prize = await dbContext.Redeameds.deleteOne({ _id: id })
      if (!prize) {
        throw new BadRequest("Invalid ID");
      }
      return prize;
    }
  }



}
export const redeamedsService = new RedeamedsService();
