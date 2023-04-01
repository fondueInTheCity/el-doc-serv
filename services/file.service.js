const sftpService = require('./Sftp.service')
const db = require("../models");
const File = db.files
const Op = db.Sequelize.Op;

const showUserFiles = async (userId, res) => {
    await File.findAll({ where: { ownerId: userId } }).then((files) => {
        res.status(200).json(files)
    });
}

const uploadUserFile = async (ownerId, fileName, res) => {
    try {
        await sftpService.put(ownerId, fileName)

        const file = {
            uid: ownerId,
            ownerId: ownerId,
            name: fileName
        };

        await File.create(file)
            .then(() => {
                res.status(200).json({
                    message: "Ok."
                })
            })
            .catch(err => {
                res.status(500).json({
                    message: err.message || "Some error occurred while upload user file."
                })
            });
    } catch {
        // await sftpService.deleteFile()
    }
}

const showFileById = async (fileId, res) => {
    await File.findOne({ where: { id: fileId } }).then((file) => {
        res.status(200).send(file)
    })
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