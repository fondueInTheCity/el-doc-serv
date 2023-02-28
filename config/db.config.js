module.exports = {
    HOST: "localhost",
    USER: "fando",
    PASSWORD: "root",
    DB: "el_doc",
    dialect: "postgres",
    PORT: 32768,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
}