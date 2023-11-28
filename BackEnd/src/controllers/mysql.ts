import mysql from "mysql";

const con = mysql.createConnection({
    host: 'localhost',
    database: 'bd_sireeea',
    user: 'root',
    password: 'password'
});
con.connect(error =>{
    if(error) throw (error);
    console.log('database ok');

});


export {con};
