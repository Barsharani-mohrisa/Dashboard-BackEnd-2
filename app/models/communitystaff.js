module.exports = (sequelize, DataTypes) => {
    const communityStaff = sequelize.define("communities_communitystaff", {
      role: {
        type:DataTypes.STRING
      },
      community_id: {
        type:DataTypes.INTEGER
      },
      user_id: {
      type:DataTypes.INTEGER
     }
     
    },
    {
      tableName:'communities_communitystaff',
      timestamps: false

    }
    );
    return communityStaff;
  };