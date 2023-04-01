module.exports = () => {
    switch(process.env.NODE_ENV) {
        case 'test':
            return {
                HOST: "localhost",
                USER: "fando",
                PASSWORD: "root",
                DB: "el_doc_test",
                dialect: "postgres",
                PORT: 32768,
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000
                
        }
        default:
            return {
                HOST: "localhost",
                USER: "fando",
                PASSWORD: "root",
                DB: "el_doc",
                dialect: "postgres",
                PORT: 32768,
                max: 5,
                min: 0,
                acquire: 30000,
                idle: 10000
        }
   
    }
}