const Client = require('ssh2-sftp-client');
const sftpConfig = require("../config/sftp.config.js");
const sftp = new Client();

const putConfig = {
    flags: 'w', // w - write and a - append
    encoding: null, // use null for binary files
    mode: 0o666, // mode to use for created file (rwx)
    autoClose: true // automatically close the write stream when finished
  };

const connect = async(options) => {
  console.log(`Connecting to ${sftpConfig.host}:${sftpConfig.port}`);
  try {
    await sftp.connect({
      host: sftpConfig.host,
      port: sftpConfig.port,
      username: sftpConfig.username,
      password: sftpConfig.password
    })
  } catch (err) {
    console.log('Failed to connect:', err);
  }
}

const disconnect = async () => {
  await sftp.end();
}

const showSftpFiles = () => {
    const client = connectSftp()
    client.then(() => {
        return sftp.list('/upload');
      }).then(data => {
        console.log(data, 'the data info');C
      }).catch(err => {
        console.log(err, 'catch error');
        disconnect()
      });
}

const put = async (userId, filename) => {
  console.log(`Uploading ${filename} to remoteFile ...`);
    try {
      await connect()
      await sftp.put('./public/' + filename,  `/upload/users/${userId}/${filename}`);
    } catch (err) {
      console.error('Uploading failed:', err);
    }
    finally {
      await disconnect()
    }
}

const listFiles = async (req, res) => {
  console.log(`Listing ...`);
  let fileObjects;
  try {
    await connect()
    const fileObjects = await sftp.list('./upload/');

    const fileNames = fileObjects.map(fileObjet => fileObjet.name);

    return fileNames;
  } catch (err) {
    console.log('Listing failed:', err);
  }
  finally {
    await disconnect()
  }
}

const createDirectory = async (path, res) => {
  try {
    await connect()
    await sftp.mkdir(path) 
    console.log("Directory created on SFTP server");
  } catch (err) {
    console.log("Failed to create directory!", err);
    res.status(500).send({ message: err.message })
  } finally {
    await disconnect()
  }
}

const deleteFile = async (path) => {
  try {
    await connect()
    await sftp.delete(path, true) 
    console.log(`File ${path} deleted on SFTP server`);
  } catch (err) {
    console.log(`Failed delete ${path} on SFTP server!`, err)
  } finally {
    await disconnect()
  }
}

const downloadFile = async (ownerId, fileName, res) => {
  try {
    await connect()

    const remotePath = `/upload/users/${ownerId}/${fileName}`;
    let dst = fs.createWriteStream('./public/' + fileName);

    await sftp.get(remotePath, dst).then((file) => {
      res.status(200).download(file)
      console.log(`Get file ${path} from SFTP server`)
    })
  } catch (err) {
    console.log(`Failed get file ${path} from SFTP server!`, err)
  } finally {
    await disconnect()
  }
}

module.exports = {
    put,
    putSftpFile: showSftpFiles,
    listFiles,
    createDirectory,
    deleteFile,
    downloadFile
  }
