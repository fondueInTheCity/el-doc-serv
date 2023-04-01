module.exports = (sequelize, Sequelize) => {
    const File = sequelize.define("files", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: {
            type: Sequelize.STRING
        },
        ownerId: {
            type: Sequelize.INTEGER
        }
    })

    return File
}