import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";

let approved = ["aliciagilfoy@gmail.com", "test@test.com", "amwalsh22@gmail.com", "mimiacya@gmail.com", "brettbittinger@championsmartialarts.win", "arianeheath@hotmail.com"]
class ChallengesService {

  async getById(id) {
    let data = await dbContext.Challenges.findOne({ _id: id })
    if (!data) {
      throw new BadRequest("Invalid ID")
    }
    return data
  }
  async getAll() {
    let query = {}
    let datas = await dbContext.Challenges.find(query)
    return datas
  }
  async create(email, body) {
    if (approved.find(e => e == email)) {
      let data = await dbContext.Challenges.create(body)
      return data
    }
  }
  async edit(id, email, update) {
    if (approved.find(e => e == email)) {
      let data = await dbContext.Challenges.findOneAndUpdate({ _id: id }, update, { new: true })
      if (!data) {
        throw new BadRequest("Invalid ID");
      }
      return data;
    }
  }
  async deleteById(id, email) {
    if (approved.find(e => e == email)) {
      let data = await dbContext.Challenges.deleteOne({ _id: id })
      if (!data) {
        throw new BadRequest("Invalid ID");
      }
      return "successfully deleted";
    }
  }

  async deleteAll(email) {
    if (approved.find(e => e == email)) {
      let query = {}
      let data = await dbContext.Challenges.deleteMany(query)
      if (!data) {
        throw new BadRequest("Invalid ID");
      }
      return "deleted";
    }
  }


}
export const challengesService = new ChallengesService();