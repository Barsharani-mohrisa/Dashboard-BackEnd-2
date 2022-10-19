module.exports = (sequelize, DataTypes) => {
    const user = sequelize.define("account", {
      first_name: {
        type:DataTypes.STRING
      },
      last_name: { 
        type:DataTypes.STRING,
        
      },
     phone: {
        type:DataTypes.STRING,
        allowNull:false,
        unique:true
      },
      email: {
        type:DataTypes.STRING,
        allowNull:false
      },
      password : {
        type:DataTypes.STRING,
        allowNull:false
     },
   
      is_active: {
        type:DataTypes.BOOLEAN,
        defaultValue:true
      },
      is_admin_approved: {
        type:DataTypes.BOOLEAN,
        defaultValue:false
      },
      is_staff: {
        type:DataTypes.BOOLEAN,
        defaultValue:false
      },
      is_superuser: {
        type:DataTypes.BOOLEAN,
        defaultValue:false
      }
    },
    {
      tableName:'account',
      createdAt:'date_joined',
      updatedAt:'last_login'
    }
    );
    return user;
  };