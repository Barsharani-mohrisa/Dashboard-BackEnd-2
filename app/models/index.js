const {Sequelize, DataTypes} = require('sequelize');

const sequelize = new Sequelize('mykom-dash', 'root', '',{
  host:'localhost',
  dialect:'mysql',
  logging:true,
  pool:{max:5,min:0,idle:10000}
});

sequelize.authenticate()
.then(()=>{
  console.log("connected");
})
.catch(err=>{
  console.log("Error"+err);
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;


db.sequelize.sync({force:false,match:/mykom-dash$/})
.then(()=>{
  console.log("yes re-sync");

  
})


 

db.user = require('./user')(sequelize,DataTypes);
db.community = require('./community.models')(sequelize,DataTypes);
db.communityStaff = require('./communitystaff')(sequelize,DataTypes);
db.resident = require('./resident')(sequelize,DataTypes);

db.notice = require('./notice.models')(sequelize,DataTypes);

//db.department.hasMany(db.user,{foreignKey:'user_id'});
db.user.hasOne(db.community,{foreignKey:'user_id'});
db.user.hasOne(db.notice,{foreignKey:'author_id'});


//db.department.belongsTo(db.user,{foreignKey:'user_id'});


db.file = require('./files.models')(sequelize,DataTypes);
db.file.belongsTo(db.user,{foreignKey:'owner_id'});


db.notice_file = require('./notice_files')(sequelize,DataTypes);


db.community.belongsToMany(db.user,{foreignKey:'community_id',through:'communities_communitystaff'});
db.user.belongsToMany(db.community,{foreignKey:'user_id',through:'communities_communitystaff'});

db.notice.belongsToMany(db.file,{foreignKey:'notice_id',through:'notice_file'});
db.file.belongsToMany(db.notice,{foreignKey:'file_id',through:'notice_file'});


module.exports = db;
