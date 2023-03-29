import pool from "../db/pg.js";

const getUsers = async () => {
    const query = "SELECT * FROM users WHERE deleted = FALSE";

    const { rows: users } = await pool.query(query);

    return users;
}

const flagInactiveUser = async(id) => {
    const query = "SELECT * FROM orders WHERE user_id = $1";
    const { rows: orders } = await pool.query(query, [id]);

    if(orders.length == 0){
        const query2 = "UPDATE users SET active = FALSE WHERE id = $1"; 
        const { rows: orders } = await pool.query(query2, [id]);

        return true;
    }

    return false;
}

export {getUsers, flagInactiveUser}