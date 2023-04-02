const fileService = require('../services/file.service')

const uploadUserFile = (req, res) => {
    const ownerId = +req.params.id
    const originalname = req.file.originalname

    fileService.uploadUserFile(ownerId, originalname, res)
        .then(() => res.status(200).json("Ok."))
};

const showUserFiles = async (req, res) => {
    const userId = req.params.id

    const files = await fileService.showUserFiles(userId)

    res.status(200).json(files)
};

const showFileById = async (req, res) => {
    const fileId = req.params.id

    const file = await fileService.showFileById(fileId)

    res.status(200).json(file)
}

const downloadFile = async (req, res) => {
    const fileId = +req.params.id

    const file = await fileService.downloadFile(fileId)

    res.status(200).download(file.path)
}

module.exports = {
    uploadUserFile,
    showUserFiles,
    showFileById,
    downloadFile
}