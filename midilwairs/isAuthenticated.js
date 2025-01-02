import jwt from "jsonwebtoken";

const isAuthenticated = (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];    
    console.log(token);
    
    if (!token) {
      return res
        .status(401)
        .json({ messeage: "Authentication token is required",token });
    }
    const decoded = jwt.verify(token, process.env.JWT_KEY);
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
