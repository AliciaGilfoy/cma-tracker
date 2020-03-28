import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";

let approved = ["aliciagilfoy@gmail.com", "test@test.com"]
class StudentsService {

  async getStudentsByProfileEmail(email) {
    let students = await dbContext.Students.find({ profileEmail: email }).populate("challengeId", "name")
    if (!students) {
      throw new BadRequest("Invalid email or you do not have access to this student")
    }
    return students
  }
  async getById(id, email) {
    let student = await dbContext.Students.findOne({ _id: id, profileEmail: email })
    if (!student) {
      throw new BadRequest("Invalid ID or you do not have access to this student")
    }
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

  async create(body) {
    let student = await dbContext.Students.create(body)
    return student
  }
  async spendPoints(id, email, prize) {
    let student = await dbContext.Students.findOne({ _id: id, profileEmail: email });
    if (!student) {
      throw new BadRequest("Invalid ID or you do not have access to this student");
    } else {
      // @ts-ignore
      if (student.points < prize.price) {
        throw new BadRequest("Not enough points");
      } else {
        // @ts-ignore
        student.points -= prize.price
        await student.save();
      }
      return student;
    }
  }

  async addPoints(id, email, update) {
    let student = await dbContext.Students.findOne({ _id: id, profileEmail: email });
    if (!student) {
      throw new BadRequest("Invalid ID or you do not have access to this student");
    } else {
      // @ts-ignore
      if (student.date.find(d => d == update.date)) {
        return "No"
      } else {
        // @ts-ignore
        student.points += update.points
        // @ts-ignore
        student.date.push(update.date)
        await student.save();
        return student;
      }
    }
  }

  async addChallenge(id, email, body) {
    let student = await dbContext.Students.findOne({ _id: id, profileEmail: email });
    if (!student) {
      throw new BadRequest("Invalid ID or you do not have access to this student");
    } else {
      // @ts-ignore
      if (student.challengeId.find(c => c == body.challengeId)) {
        return "No"
      } else {
        // @ts-ignore
        student.points += body.points
        // @ts-ignore
        student.challengeId.push(body.challengeId)
        // @ts-ignore
        student.challengeName.push(body.challengeName)
        await student.save();
        return student;
      }
    }
  }
  async editName(id, email, update) {
    let student = await dbContext.Students.findOneAndUpdate({ _id: id, profileEmail: email }, update, { new: true })
    if (!student) {
      throw new BadRequest("Invalid ID or you do not own this board");
    }
    return student;
  }
  async deleteById(id, email) {
    if (approved.find(e => e == email)) {
      await dbContext.Students.deleteOne({ _id: id });
      return "deleted"
    } else {
      return "You can not delete this."
    }
  }

  async deleteAll(userEmail) {
    if (approved.find(e => e == userEmail)) {
      let query = {}
      await dbContext.Students.deleteMany(query);
      return "deleted"
    } else {
      return "You can not delete this."
    }
  }
}

export const studentsService = new StudentsService();
