const { Pool } = require('pg');
const cfenv = require('cfenv');


const env = cfenv.getAppEnv();
const credentials = env.services["postgresql-db"][0].credentials

const pool = new Pool({
  host: credentials.hostname,
  port: credentials.port,
  database: credentials.dbname,
  user: credentials.username,
  password: credentials.password,
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