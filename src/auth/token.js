import { verifyToken } from "./tools.js";
import createError from "http-errors";

export const tokenAuth = async (req, res, next) => {
  if (!req.headers.authorization) {
    next(
      createError(
        401,
        "Please provide bearer token in the authorization header!"
      )
    );
    console.log(Error);
  } else {
    try {
      const token = req.headers.authorization.split(" ")[1];
      // const token = req.headers.authorization.replace("Bearer ", "");
      // console.log(token);
      const payload = await verifyToken(token);
      if (payload) {
        req.user = {
          _id: payload._id,
          username: payload.username,
          role: payload.role,
        };
        next();
      }
    } catch (error) {
      next(createError(401, "Token not valid!"));
    }
  }
};
