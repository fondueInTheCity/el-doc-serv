const DbConfig = require("../config/db.config.js");
const dbConfig = DbConfig()

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    port: dbConfig.PORT,
    operatorsAliases: false,

    pool: {
        max: dbConfig.max,
        min: dbConfig.min,
        acquire: dbConfig.acquire,
        idle: dbConfig.idle
      }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./user.model.js")(sequelize, Sequelize);
db.roles = require('./role.model.js')(sequelize, Sequelize)
db.files = require('./file.model.js')(sequelize, Sequelize)

db.roles.belongsToMany(db.users, {
  as: 'users',
  through: "user_roles"
});
db.users.belongsToMany(db.roles, {
  as: 'roles',
  through: "user_roles"
});

db.files.belongsToMany(db.users, {
  through: "user_files",
  foreignKey: "fileId",
  otherKey: "userId"
});
db.users.belongsToMany(db.files, {
  through: "user_files",
  foreignKey: "userId",
  otherKey: "fileId"
});

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;