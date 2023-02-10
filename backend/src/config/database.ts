require("../bootstrap");
import config from './config'

module.exports = {
  define: {
    charset: "utf8mb4",
    collate: "utf8mb4_bin"
  },
  dialect: config.dbtype,
  timezone: "-03:00",
  host: config.dbhost,
  database: config.db,
  username: config.user,
  password: config.pass,
  logging: false
};
