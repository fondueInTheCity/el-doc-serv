const fileService = require('../services/file.service')

const uploadUserFile = (req, res) => {
    const ownerId = +req.params.ownerId
    const originalname = req.file.originalname

    fileService.uploadUserFile(ownerId, originalname, res)
};

const showUserFiles = async (req, res) => {
    const userId = req.params.id

    await fileService.showUserFiles(userId, res)
};

const showFileById = async (req, res) => {
    const fileId = req.params.id

    await fileService.showFileById(fileId, res)
}

const downloadFile = async (req, res) => {
    const fileId = req.params.id

    await fileService.downloadFile(fileId, res)
}

module.exports = {
    uploadUserFile,
    showUserFiles,
    showFileById,
    downloadFile
}