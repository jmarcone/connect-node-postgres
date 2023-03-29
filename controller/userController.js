// GET  /  : To get all the users 
// POST / -> To create a new user 

// GET  /:id :  To get one user (with the id) 
// PUT /:id  :  To edit one user (with the id) 
// DELETE  /:id : To delete one user (with the id)
import { Router } from "express";
import { getUsers, flagInactiveUser } from "../model/userModel.js";
import pool from "../db/pg.js";

const userController = Router();

userController
    .route("/")
    .get(
        (req, res) => {
            getUsers()
                .then(users => {
                    res.json(users)
                })
        }
    )

    .post(
        (req, res) => {
            const { first_name, last_name, age } = req.body;

            if (!first_name || !last_name || !age)
                return res.json({ error: "missing data" });


            const query = "INSERT INTO users (first_name, last_name, age) VALUES ($1, $2, $3) RETURNING *";

            pool
                .query(
                    query,
                    [first_name, last_name, age]
                )
                .then(({ rows: [user] }) => {
                    res
                        .status(201)
                        .json(user);
                })
        }
    )

userController
    .route("/:id/")
    .get(
        (req, res) => {
            const { id } = req.params;
            const query = "SELECT * FROM users WHERE id = $1 ";

            pool
                .query(
                    query,
                    [id]
                )
                .then(({ rows: [user] }) => {
                    res.json(user);
                })
        }
    )
    .delete(
        (req, res) => {
            const { id } = req.params;
            const query = "UPDATE users SET active = FALSE WHERE id = $1 RETURNING *";

            pool
                .query(
                    query,
                    [id]
                )
                .then(({ rows: [user] }) => {
                    res.json(user);
                })
        }
    )
    .put(
        (req, res) => {
            const { id } = req.params;
            const { first_name, last_name, age } = req.body;
            if (!first_name || !last_name || !age)
                return res.json({ error: "missing data" });


            const query = "UPDATE users SET first_name = $1, last_name = $2, age = $3 WHERE id = $4 RETURNING *";

            pool
                .query(
                    query,
                    [first_name, last_name, age, id]
                )
                .then(({ rows: [user] }) => {
                    res
                        .status(201)
                        .json(user);
                })
        }
    )

userController
    .route("/:id/check-inactive/")
    .put(
        (req, res) => {
            const {id} = req.params;
            
            flagInactiveUser(id).then(flagged => {
                res.json({message: flagged ? "user marked as inactive" : "user is active"})
            })

        }
    )

export default userController;