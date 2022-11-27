const { Pool } = require('pg');

// Notice here
const pool = new Pool({
  host: "postgres-403d5697-a293-488a-a8cf-7d5158d90b24.postgres.database.azure.com",
  port: "5432",
  database: "rXXyINYzpXIZ",
  user: "a1fdca38d606",
  password: "a9f5672bdbce",
  ssl: {
    require: true, // This will help you. But you will see nwe error
    rejectUnauthorized: false // This line will fix new error
  }
});

module.exports = {
  async select(sql) {
    return new Promise(async (resolve, reject) => {
      try {
        const result = await pool.query(sql); // <-- Notice here
        resolve(JSON.stringify(result));
      }

      catch (ex) {
        reject("We messed up! " + ex);
      }
    });
    /* No need to release client as Pool does it for you internally */
  }
};