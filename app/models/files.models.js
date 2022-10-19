module.exports = (sequelize, DataTypes) => {
    const file = sequelize.define("files_file", {
  
        media: DataTypes.STRING,
        owner_id: DataTypes.INTEGER
      
    },{
        tableName:'files_file',
        timestamps: false
      }
    );
    return file;

  };
  