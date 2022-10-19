module.exports = (sequelize, DataTypes) => {
    const community = sequelize.define("communities_community", {
      community_name: {
        type:DataTypes.STRING
      },
      builder_name: { 
        type:DataTypes.STRING,
        
      },
     pincode: {
        type:DataTypes.INTEGER,
        allowNull:false
      },
      address: {
        type:DataTypes.STRING,
        allowNull:true
      },
      latitude : {
        type:DataTypes.STRING,
        allowNull:true
     },
     longitude: {
      type:DataTypes.STRING,
      allowNull:false
        },
      is_active: {
        type:DataTypes.BOOLEAN,
        defaultValue:true
      },
      city_id: {
        type:DataTypes.INTEGER
          }
     
    },
    {
      tableName:'communities_community',
      createdAt:'created_at',
      updatedAt:'modified_at'
    }
    );
    return community;
  };