"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// const Book = db.BookName
// Use the `db` object as needed in your TypeScript code
// const dataSource = DATA_SOURCES.mySqlDataSource;
// const pool = mysql.createPool({
//     host: dataSource.DB_HOST,
//     user: dataSource.DB_USER,
//     password: dataSource.DB_PASSWORD,
//     database: dataSource.DB_DATABASE,
// });
// export const createBook = async (req: Request, res: Response, next: NextFunction) => {
//   console.log('res',req.body)
//   const { author, title } = req.body;
//   try {
//     const connection = await pool.getConnection();
//     const [result] = await connection.execute<ResultSetHeader>('INSERT INTO books (author, title) VALUES (?, ?)', [author, title]);
//     connection.release();
//     return res.status(201).json({
//       book: result.insertId
//     });
//   } catch (error: any) {
//     return res.status(500).json({
//       message: error.message,
//       error
//     });
//   }
// };
// export const getAllBooks = async (req: Request, res: Response, next: NextFunction) => {
//   console.log('get')
//   try {
//     const connection = await pool.getConnection();
//     const [results] = await connection.query<RowDataPacket[]>('SELECT * FROM books');
//     connection.release();
//     return res.status(200).json({
//       books: results,
//       count: results.length
//     });
//   } catch (error: any) {
//     return res.status(500).json({
//       message: error.message,
//       error
//     });
//   }
// };
// import { Request, Response } from 'express';
// // import bcrypt from 'bcrypt';
// // import { v4 as uuidv4 } from 'uuid';
// // import { Employee } from '../models/index';
// // import { BadRequest, APIError, HttpStatusCode, MessageTag } from 'your-error-package'; // Replace 'your-error-package' with the actual error package you are using
// // import { isEmpty, getRequestUserId } from 'your-utility-package'; // Replace 'your-utility-package' with the actual utility package you are using
// import { isEmpty } from 'lodash';
// // Use the `isEmpty` function in your TypeScript code
// export const createBook = async (req: Request, res: Response) => {
//   // Point 1: HERE WE SHOULD BE HAVING SAME FIELDS FOR BOTH FRONTEND AND BACKEND
//   const {
//    id,
//    author,
//    title,
//   } = req.body;
//   if (
//     !id||
//     !author||
//     !title
//   ) {
//     res.send('error')
//   }
//   const isExists = await Book.findAll({
//     where: {
//       id: id,
//     },
//   });
//   const isEmpIdExists = await Book.findAll({
//     where: {
//       id: id,
//     },
//   });
//   if (!isEmpty(isExists)) {
//     console.log('Exists')
//   }
//   if (!isEmpty(isEmpIdExists)) {
//     console.log('Does Not Exists')
//   }
//   const isCreated = await Book.create({
//     id:id,
//     author : author,
//     title : title
//   });
//   if (!isEmpty(isCreated)) {
//     res.status(200).json({
//       status: true,
//       message: 'success',
//       data: isCreated,
//       statusCode: 200,
//     });
//   }
// };
