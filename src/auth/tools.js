import jwt from "jsonwebtoken";

export const generateToken = (payload) =>
  new Promise((resolve, reject) =>
    jwt.sign(
      payload,
      process.env.SECRET,
      { expiresIn: "1 week" },
      (err, token) => {
        if (err) reject(err);
        else resolve(token);
      }
    )
  );

export const verifyToken = (token) =>
  new Promise((resolve, reject) =>
    jwt.verify(token, process.env.SECRET, (err, payload) => {
      if (err) reject(err);
      else resolve(payload);
    })
  );
