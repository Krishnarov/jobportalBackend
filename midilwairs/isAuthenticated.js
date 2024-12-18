import jwt from "jsonwebtoken";

const isAuthenticated = (req, res, next) => {
  console.log("Cookies:", req.cookies); // Debug cookies
  console.log("Authorization Header:", req.headers.authorization);
  try {
    const token = req.cookies?.token;
    if (!token) {
      return res
        .status(401)
        .json({ messeage: "Authentication token is required" });
    }
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    // console.log("Decoded token:", decoded)
    if (!decoded) {
      return res.status(401).json({ messeage: "invalied token", token: token });
    }

    req.id = decoded.userId;
    next();
  } catch (error) {
    res.status(501).json({ messeage: "internat server erroe", error });
  }
};
export default isAuthenticated;
