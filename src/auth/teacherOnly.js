import createError from "http-errors";

export const teacherOnlyMiddleware = (req, res, next) => {
  if (req.user.role === "Teacher") {
    next();
  } else {
    next(createError(403, "Teacher only endpoint!"));
  }
};
