const fileService = require('../services/file.service')

const uploadUserFile = (req, res) => {
    try {
        const ownerId = +req.params.id
        const originalname = req.file.originalname

        fileService.uploadUserFile(ownerId, originalname, res)
            .then(() => res.status(200).json("Ok."))
    } catch (err) {
        res.status(err.status || 500).json(err.message)
    }
};

const showUserFiles = async (req, res) => {
    try {
    const userId = req.params.id

    const files = await fileService.showUserFiles(userId)

    res.status(200).json(files)
    } catch (err) {
        res.status(500).json(err.message)
    }
};

const showFileById = async (req, res) => {
    try {
    const fileId = req.params.id

    const file = await fileService.showFileById(fileId)

    res.status(200).json(file)
    } catch (err) {
        res.status(500).json(err.message)
    }
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