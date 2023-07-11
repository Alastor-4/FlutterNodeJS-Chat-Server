const mongoose = require('mongoose');


const dbConnection = async() => {
   
    try {
        console.log('Conectando DB......', process.env.LOCAL_DB);
        
        await mongoose.connect(process.env.LOCAL_DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }, err => {
            if(err) throw err;
            console.log('Connected to MongoDB!!!');
        });
        
    } catch (error) {
        console.log(error);
        throw new Error('Error en la base de datos - Hable con el admin');
    }
   

}

module.exports = {
    dbConnection
}