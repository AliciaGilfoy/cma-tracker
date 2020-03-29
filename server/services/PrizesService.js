import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";

let approved = ["aliciagilfoy@gmail.com", "test@test.com", "amwalsh22@gmail.com", "mimiacya@gmail.com", "brettbittinger@championsmartialarts.win", "arianeheath@hotmail.com"]
class PrizesService {

  async getById(id) {
    let prize = await dbContext.Prizes.findOne({ _id: id })
    if (!prize) {
      throw new BadRequest("Invalid ID or you do not have access to this prize")
    }
    return prize
  }

  async getAll(query = {}) {
    let prizes = await dbContext.Prizes.find(query)
    return prizes
  }
  async create(email, body) {
    if (approved.find(e => e == email)) {
      let prize = await dbContext.Prizes.create(body)
      return prize
    } else {
      return "You are not allowed to create prizes!"
    }
  }

  async edit(id, email, update) {
    if (approved.find(e => e == email)) {
      let prize = await dbContext.Prizes.findOneAndUpdate({ _id: id }, update, { new: true })
      if (!prize) {
        throw new BadRequest("Invalid ID or you do not own this board");
      }
      return prize;
    }
  }
  async deleteById(id, email, update) {
    if (approved.find(e => e == email)) {
      let prize = await dbContext.Prizes.findOneAndUpdate({ _id: id }, update, { new: true })
      if (!prize) {
        throw new BadRequest("Invalid ID or you do not own this board");
      }
      return prize;
    }
  }
}
export const prizesService = new PrizesService();