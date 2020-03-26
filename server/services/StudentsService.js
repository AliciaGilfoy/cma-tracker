import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";

let approved = ["aliciagilfoy@gmail.com", "test@test.com"]
class StudentsService {
  async deleteAll(userEmail) {
    if (approved.find(e => e == userEmail)) {
      let query = {}
      await dbContext.Students.deleteMany(query);
      return "deleted"
    } else {
      return "You can not delete this."
    }
  }
  async addPoints(body) {
    let student = await dbContext.Students.findOne({ name: body.name });
    if (!student) {
      return await this.create(body)
    }
    else {
      if (student.key == body.key) {
        if (student.dates.find(d => d == body.date)) {
          return "You already entered points for this day"
        } else {
          student.points += body.points
          student.dates.push(body.date)
          await student.save()
        }
      }
      else {
        return "Parent Name does not match";
      }
    }
    return student;
  }
  async create(body) {
    let student = await dbContext.Students.create(body)
    return student
  }
  async getAll(query = {}) {
    let students = await dbContext.Students.find(query);
    return students;
  }
  async getByName(name) {
    let student = await dbContext.Students.findOne({ name: name });
    if (!student) {
      throw new BadRequest("No valid student");
    }
    return student;
  }
}

export const studentsService = new StudentsService();
