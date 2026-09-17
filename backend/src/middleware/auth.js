import jwt from "jsonwebtoken";

// Yo middleware le check garcha: request sanga valid token cha ki chaina
const protect = (req, res, next) => {
  const authHeader = req.headers.authorization; // "Bearer <token>"

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded; // decoded ma { id, email } huncha
    next(); // sabai thik cha bhane next route/controller ma jane
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default protect;
