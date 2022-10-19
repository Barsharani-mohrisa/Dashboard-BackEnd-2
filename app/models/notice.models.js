
module.exports = (sequelize, DataTypes) => {
    const notice = sequelize.define("communities_notice", {
      subject: {
        type:DataTypes.STRING
      },
      message: { 
        type:DataTypes.STRING
      },
      community_id: {
        type:DataTypes.INTEGER
      },
      author_id: {
      type:DataTypes.INTEGER
     }
    },{
      tableName:'communities_notice',
      createdAt:'published_at',
      timestamps: false
    }
   
    );
    return notice;
  };
  