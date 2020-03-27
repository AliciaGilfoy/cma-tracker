import mongoose from "mongoose";
import StudentSchema from "../models/Student";
import ProfileSchema from "../models/Profile";
import PrizeSchema from "../models/Prize";
import RedeamedSchema from "../models/Redeamed";
import ChallengeSchema from "../models/Challenge";

class DbContext {
  Students = mongoose.model("Student", StudentSchema);
  Profile = mongoose.model("Profile", ProfileSchema);

  Prizes = mongoose.model("Prize", PrizeSchema);

  Redeameds = mongoose.model("Redeamed", RedeamedSchema);

  Challenges = mongoose.model("Challenge", ChallengeSchema);

}

export const dbContext = new DbContext();
