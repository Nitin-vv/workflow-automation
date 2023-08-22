import {Request,Response} from 'express';
import bcrypt from 'bcryptjs';
import jwt,{Secret} from 'jsonwebtoken';
import * as dotenv from 'dotenv';
import db from '../models';
import {MessageTag} from '../enums/messageEnums'

dotenv.config();
const accessTokenSecret: Secret=process.env.ACCESS_TOKEN_SECRET||'thisisfallbackSecret123456789';
import {isEmpty} from 'lodash';

const Users=db.Users

function generateAccessToken(user: any) {
  return jwt.sign(user,accessTokenSecret,{expiresIn: '1d'})
}

export const signup=async (req: Request,res: Response) => {
  const signupAuth=req.body;
  if(signupAuth) {
    const name=signupAuth.name;
    const email=signupAuth.email.toLowerCase();
    const password=signupAuth.password
    try {
      if(!name||!email||!password) throw new Error(MessageTag.ALL_REQ);
      const isExists=await Users.findOne({
        where: {email: email},
      })
      if(!isExists) {
        const salt=await bcrypt.genSalt(10);
        const hash=await bcrypt.hash(password,salt);
        const isCreated=await Users.create({
          name: name,
          email: email,
          password: hash,
        });
        if(isCreated) {
          res.send({
            status: true,
            message: MessageTag.RegisterSuccess,
            data: isCreated,
            statusCode: 200,
          });
        }
      } else {
        res.send({
          status: false,
          statusCode: 409,
          message: MessageTag.UserExists
        });
      }
    } catch(error) {
      res.send({
        message: MessageTag.Error,
        error: error,
        statusCode: 500
      });
    }
  }

};

export const login=async (req: Request,res: Response) => {
  const {email,password}=req.body;
  try {
    if(!email||!password) throw new Error(MessageTag.ALL_REQ);
    const isExists=await Users.findOne({
      where: {email: email},
      attributes: ['userid','accountid','name','email','password','role','createdAt','updatedAt']
    })
    if(isExists) {
      const userid=isExists.dataValues.userid;
      const accountid=isExists.dataValues.accountid;
      const name=isExists.dataValues.name;
      const role=isExists.dataValues.role;
      const hashedPassword=isExists.dataValues.password
      const isPasswordMatch=await bcrypt.compare(password,hashedPassword)
      if(isPasswordMatch) {
        const token=generateAccessToken({userid,accountid,name,email,role})
        res.status(200).json({
          token: token,
          role: isExists.dataValues?.role,
          statusCode: 200,
          message: 'Login Successful',
        })
      } else {
        return res.status(401).json({
          statusCode: 401,
          message: MessageTag.WrongCredentials
        });
      }
    } else {
      return res.status(404).json({
        statusCode: 404,
        message: MessageTag.NoUser
      });
    }
  } catch(error) {
    res.status(500).json({
      message: MessageTag.Error,
      error: error
    });
  }

};

export const forgotpassword=async (req: Request,res: Response) => {
  const forgotAuth=req.body;
  if(forgotAuth) {
    const email=forgotAuth.email.toLowerCase();
    const password=forgotAuth.password;
    try {
      if(!email) throw new Error(MessageTag.ALL_REQ);
      const isExists=await Users.findOne({
        where: {email: email},
      })
      if(isExists) {
        const salt=await bcrypt.genSalt(10);
        const hash=await bcrypt.hash(password,salt);
        const isUpdated=await Users.update(
          {
            password: hash
          },
          {
            where: {
              email,
            },
            returning: true,
          },
        )
        if(isUpdated) {
          res.send({
            status: true,
            statusCode: 200,
            data: isUpdated,
            message: MessageTag.PasswordUpdated
          });
        }
      } else {
        res.send({
          status: false,
          statusCode: 404,
          message: MessageTag.EmailNotFound
        });
      }
    } catch(error) {
      res.send({
        statusCode: 500,
        message: MessageTag.Error,
        error: error
      });
    }
  }

};

export const userInfo=async (req: Request,res: Response) => {
  const authHeader=req?.headers?.authorization;
  try {
    const token: string|undefined=authHeader?.split(" ")[1]; // Assuming the token is in the format "Bearer <token>"
    if(!token) {
      return res.status(401).json({
        status: false,
        statusCode: 401,
        message: 'No token provided'
      });
    }
    const accessTokenSecret: Secret=process.env.ACCESS_TOKEN_SECRET||'thisisfallbackSecret123456789';
    jwt.verify(token,accessTokenSecret,async (error: any,decodedToken: any) => {
      if(error) {
        return res.status(500).json({
          status: false,
          statusCode: 500,
          message: 'Failed to decode token'
        });
      }
      const userDetails=await Users.findOne({
        where: {userid: decodedToken?.userid},
      })
      const data={
        name: userDetails.name,
        email: userDetails.email,
        role: decodedToken.role,
        createdAt: userDetails.createdAt,
        updatedAt: userDetails.updatedAt
      }
      res.send({
        status: true,
        statusCode: 200,
        data: data
      });
    });
  } catch(error) {
    // Handle any other errors that may occur
    res.status(500).json({
      status: false,
      statusCode: 500,
      message: 'An error occurred'
    });
  }
};