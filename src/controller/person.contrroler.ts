import { pool } from "../db/db";
import ErrorFactory from "../factory/error.factory";
import { redisSetGet } from "../factory/redis.factory";
import ResponseFactory from "../factory/response.factory";
import { Request, Response } from "express";

export default class person {
  static async create(req: Request, res: Response) {
    try {
      const { first_name, last_name, email, gender } = req.body;
      const person = await pool.query(
        "INSERT INTO person(first_name,last_name,email,gender) VALUES($1, $2,$3,$4) RETURNING *",
        [first_name, last_name, email, gender]
      );
      ResponseFactory(res, 201, "person created", person.rows[0]);
    } catch (error) {
      console.log(error);
    }
  }

  static async getAll(req: Request, res: Response) {
    try {
      const persons = await redisSetGet("persons", async () => {
        const data = await pool.query("SELECT * FROM person");
        return data.rows;
      });
      ResponseFactory(res, 200, "get all persons", persons);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  static async getSingle(req: Request, res: Response) {
    try {
      const user: any = await redisSetGet(
        `person:${req.params.id}`,
        async () => {
          const data = await pool.query("SELECT * FROM person WHERE id= $1", [
            req.params.id,
          ]);

          return data.rows;
        }
      );
      if (!user) return ErrorFactory(res, 403, "user not exist");

      ResponseFactory(res, 200, "get user", user);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
  static async deleteSingle(req: Request, res: Response) {
    try {
      const user: any = await pool.query("SELECT FROM person WHERE id=$1", [
        req.params.id,
      ]);
      if (user.rows == 0)
        return ErrorFactory(res, 404, "user not exist to delete");
      await pool.query("DELETE FROM person WHERE id=$1", [req.params.id]);
      ResponseFactory(res, 200, "user deleted");
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
  static async update(req: Request, res: Response) {
    try {
      const { first_name, last_name, email, gender } = req.body;
      let updateQuery = "UPDATE person SET";
      const updateValues = [];
      let paramIndex = 1;

      if (first_name) {
        updateQuery += ` first_name=$${paramIndex},`;
        updateValues.push(first_name);
        paramIndex++;
      }

      if (last_name) {
        updateQuery += ` last_name=$${paramIndex},`;
        updateValues.push(last_name);
        paramIndex++;
      }

      if (email) {
        updateQuery += ` email=$${paramIndex},`;
        updateValues.push(email);
        paramIndex++;
      }

      if (gender) {
        updateQuery += ` gender=$${paramIndex},`;
        updateValues.push(gender);
        paramIndex++;
      }

      // Remove the trailing comma and add the WHERE clause
      updateQuery =
        updateQuery.slice(0, -1) + ` WHERE id=$${paramIndex} RETURNING *`;

      const user: any = await pool.query(updateQuery, [
        ...updateValues,
        req.params.id,
        
      ]);
      if (user.rows == 0)
        return ErrorFactory(res, 404, "user not exist to update");
      ResponseFactory(res, 200, "user updated", user.rows);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}
