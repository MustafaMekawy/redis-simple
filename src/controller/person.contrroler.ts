import { pool } from "../db/db";
import {redisSetGet} from '../factory/redis.factory'
import ResponseFactory from "../factory/response.factory";
import { Request, Response } from 'express';

export default class person{

    static async create(req:Request, res:Response){
        try {
          const { first_name, last_name, email, gender } = req.body;
          const person = await pool.query(
            "INSERT INTO person(first_name,last_name,email,gender) VALUES($1, $2,$3,$4) RETURNING *",
            [first_name, last_name, email, gender]
          );
          ResponseFactory(res,201,"person created",person.rows[0]);
        } catch (error) {
          console.log(error);
        }
      };


     static async getAll(req:Request, res:Response){
        try {
          const persons = await redisSetGet("persons", async () => {
            const data = await pool.query("SELECT * FROM person");
            return data.rows;
          });
          // res.json(persons);
          ResponseFactory(res,200,"get all persons",persons)
        } catch (error) {
          console.log(error);
          res.status(500).json({ error: "Internal Server Error" });
        }
      } 

      // static getSingle(req,res){
      //   try {

          
      //   } catch (error) {
          
      //   }
      // }
}