const { Sequelize } = require("sequelize");

const db = new Sequelize('GandG','root','password',{
    host:"localhost" , 
    dialect:"mysql"
})

module.exports = {
    db
}