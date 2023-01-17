const sequelize = require('../db');
const {DataTypes} = require('sequelize');

const User = sequelize.define('user', {
    id : {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    confirmed : {type: DataTypes.BOOLEAN, defaultValue: false},
    name : {type: DataTypes.STRING},
    phone : {type: DataTypes.STRING, unique: true},
    role : {type: DataTypes.STRING, defaultValue: 'USER'},
    discount : {type: DataTypes.INTEGER, defaultValue: 0},
    sessions_number : {type: DataTypes.INTEGER, defaultValue: 0},
    auth_key : {type: DataTypes.STRING},
    auth_key_validity_period : {type: DataTypes.TIME}
})

module.exports = {
    User
}