import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";

let approved = ["aliciagilfoy@gmail.com", "test@test.com"]
class TasksService {
  async getById(id) {
    let prize = await dbContext.Tasks.findOne({ _id: id })
    if (!prize) {
      throw new BadRequest("Invalid ID")
    }
    return prize
  }
  async getAll() {
    let query = {}
    let prizes = await dbContext.Tasks.find(query)
    return prizes
  }
  async create(email, body) {
    if (approved.find(e => e == email)) {
      let prize = await dbContext.Tasks.create(body)
      return prize
    }
  }
  async edit(id, email, update) {
    if (approved.find(e => e == email)) {
      let prize = await dbContext.Tasks.findOneAndUpdate({ _id: id }, update, { new: true })
      if (!prize) {
        throw new BadRequest("Invalid ID");
      }
      return prize;
    }
  }
  async deleteById(id, email) {
    if (approved.find(e => e == email)) {
      let prize = await dbContext.Tasks.deleteOne({ _id: id })
      if (!prize) {
        throw new BadRequest("Invalid ID");
      }
      return prize;
    }
  }



}
export const tasksService = new TasksService();