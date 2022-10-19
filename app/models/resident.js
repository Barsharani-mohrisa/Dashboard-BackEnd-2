module.exports = (sequelize, DataTypes) => {
    const resident = sequelize.define("residents_resident", {
      role: {
        type:DataTypes.STRING
      },
      occupancy_status: { 
        type:DataTypes.STRING
      },
      is_approved: {
        type:DataTypes.BOOLEAN,
        defaultValue:false
      },
      connect_opt_in: {
        type:DataTypes.BOOLEAN,
        defaultValue:false
      },
      approved_by_id: {
        type:DataTypes.INTEGER,
        allowNull:true
      },
      flat_id: {
        type:DataTypes.INTEGER
      },
      user_id: {
      type:DataTypes.INTEGER
     }
    },
    {
      tableName:'residents_resident',
      timestamps: false

    }
    );
    return resident;
  };