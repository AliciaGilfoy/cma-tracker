import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";

class StudentsService {
  async deleteAll(query = {}) {
    return await dbContext.Students.deleteMany(query);
  }
  async addPoints(body) {
    let student = await dbContext.Students.findOne({ name: body.name });
    if (!student) {
      this.create(body)
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
