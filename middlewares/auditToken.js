import jwt from "jsonwebtoken";
import HttpError from "../helpers/HttpError.js";
import User from "../models/user.js";

async function auditToken(req, res, next) {
  const { autorization } = req.headers;

  if (typeof autorization === "undefined") {
    res.status(401).send({ message: "Not authorized" });
  }

  const [bearer, token] = autorization.split(" ", 2);

  if (bearer !== "Bearer") {
    return res.status(401).send({ message: "Not authorized" });
  }

  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(id);

    if (user.token === null) {
      next(HttpError(401));
    }

    if (!user) {
      next(HttpError(401));
    }

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
}

export default auditToken;
