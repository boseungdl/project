const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';

const User = require('./user')
const Store = require('./store')
const Menu = require('./menu')
const Review = require('./review')
 

const config = require("../config/config.json")[env]
 
const db = {};
 
const sequelize = new Sequelize(config.database, config.username, config.password, config)
 
db.sequelize = sequelize; 

db.User = User;
db.Store = Store;
db.Menu = Menu;
db.Review = Menu;

User.init(sequelize);
Store.init(sequelize);
Menu.init(sequelize);
Review.init(sequelize);

Store.associate(db);
Menu.associate(db);
Review.associate(db);

module.exports = db;