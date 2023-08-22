import jwt,{JwtPayload,Secret} from "jsonwebtoken";
import {Request,Response,NextFunction} from "express";

interface CustomRequest extends Request {
  user?: JwtPayload; // Define the user property on the custom request interface
}

const isUserAuthenticated=(
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader=req.headers["authorization"];
    if(!authHeader) {
      return res
        .status(403)
        .send({error: true,message: "A token is required for authentication"});
    }

    const tokenArr=authHeader.split(" ");
    const jwtToken=tokenArr[1];

    if(!jwtToken) {
      return res
        .status(403)
        .send({error: true,message: "A token is required for authentication"});
    }

    const secretKey=process.env.ACCESS_TOKEN_SECRET as Secret;
    if(!secretKey) {
      throw new Error(
        "ACCESS_TOKEN_SECRET is not defined in the environment variables"
      );
    }

    const decoded: any=jwt.verify(jwtToken,secretKey,(err: any,decoded: any) => {
      if(err) {
        if(err.name==="TokenExpiredError") {
          return {message: "token expired"};
        }
        throw err;
      }
      return decoded;
    });

    if(decoded?.message==="token expired") {
      return res.status(401).send({
        error: true,
        message: "Token has expired, please log in again!"
      });
    }
    req.user=decoded;
    next();
  } catch(err) {
    console.error(err);
    return res.status(401).send({error: true,message: "Invalid Token"});
  }
};

export default isUserAuthenticated;
