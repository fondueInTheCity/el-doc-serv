const sftpService = require('./Sftp.service')
const db = require("../models");
const File = db.files
const Op = db.Sequelize.Op;

const showUserFiles = async (userId) => {
    throw { message: "Error" }
    return await File.findAll({ where: { ownerId: userId } })
}

const uploadUserFile = async (ownerId, fileName) => {
    try {
        await sftpService.put(ownerId, fileName)

        const file = {
            uid: ownerId,
            ownerId: ownerId,
            name: fileName
        };

        await File.create(file)
    } catch (err) {
        // await sftpService.deleteFile()
        throw err
    }
}

const showFileById = async (fileId) => {
    return await File.findOne({ where: { id: fileId } })
}

const downloadFile = async (fileId, res) => {
    await File.findOne({ where: { id: fileId } }).then(async (file) => {
        await sftpService.downloadFile(file.ownerId, file.name, res)
    })
}

module.exports = {
    showUserFiles,
    showFileById,
    uploadUserFile,
    downloadFile
}