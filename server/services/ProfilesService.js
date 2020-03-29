import { dbContext } from "../db/DbContext";
let approved = ["aliciagilfoy@gmail.com", "test@test.com", "amwalsh22@gmail.com", "mimiacya@gmail.com", "brettbittinger@championsmartialarts.win", "arianeheath@hotmail.com"]
// Private Methods

/**
 * Creates profile if one does not exist
 * @param {any} profile
 * @param {any} user
 */
async function createProfileIfNeeded(profile, user) {
  if (!profile) {
    profile = await dbContext.Profile.create({
      ...user,
      subs: [user.sub]
    });
  }
  return profile;
}

/**
 * Adds sub to profile if not already on profile
 * @param {any} profile
 * @param {any} user
 */
async function mergeSubsIfNeeded(profile, user) {
  if (!profile.subs.includes(user.sub)) {
    // @ts-ignore
    profile.subs.push(user.sub);
    await profile.save();
  }
}
/**
 * Restricts changes to the body of the profile object
 * @param {any} body
 */
function sanitizeBody(body) {
  let writable = {
    name: body.name,
    picture: body.picture
  };
  return writable;
}

class ProfileService {
  async getAllProfiles(email) {
    if (approved.find(e => e == email)) {
      let query = {}
      let students = await dbContext.Profile.find(query);
      return students;
    }
  }
  /**
   * Provided an array of user emails will return an array of user profiles with email picture and name
   * @param {String[]} emails Array of email addresses to lookup users by
   */
  async getProfiles(emails = []) {
    let profiles = await dbContext.Profile.find({
      email: { $in: emails }
    }).select("email picture name");
    return profiles;
  }

  /**
   * Returns a user profile from the Auth0 user object
   *
   * Creates user if none exists
   *
   * Adds sub of Auth0 account to profile if not currently on profile
   * @param {any} user
   */
  async getProfile(user) {
    let profile = await dbContext.Profile.findOne({
      email: user.email
    });
    profile = await createProfileIfNeeded(profile, user);
    await mergeSubsIfNeeded(profile, user);
    return profile;
  }
  /**
​    * Updates profile with the request body, will only allow changes to editable fields
​    * @param {any} user Auth0 user object
​    * @param {any} body Updates to apply to user object
​    */
  async updateProfile(user, body) {
    let profile = await dbContext.Profile.findOneAndUpdate(
      { email: user.email },
      body,
      { new: true }
    );
    return profile;
  }

  async updateProfilePermissions(user, body) {
    if (approved.find(e => e == user)) {
      let profile = await dbContext.Profile.findOneAndUpdate(
        { _id: body.profileId },
        body,
        { new: true }
      );
      return profile;
    } else {
      return "No"
    }
  }
}
export const profilesService = new ProfileService();
