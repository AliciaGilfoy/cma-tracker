import mongoose from "mongoose";
import StudentSchema from "../models/Student";
import ProfileSchema from "../models/Profile";

class DbContext {
  Students = mongoose.model("Student", StudentSchema);
  Profile = mongoose.model("Profile", ProfileSchema);
}

export const dbContext = new DbContext();
