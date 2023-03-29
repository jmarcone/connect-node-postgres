import pkg from "pg";
const {Pool} = pkg;

const pool = new Pool({
    connectionString: "postgres://hposxfxe:9iJFsp9vTpM1qJW47zDlXy1Fu7Cxd2_l@trumpet.db.elephantsql.com/hposxfxe"
})

export default pool;