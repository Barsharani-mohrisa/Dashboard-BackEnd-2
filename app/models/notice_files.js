

module.exports = (sequelize,DataTypes)=>{
    const notice_file = sequelize.define("communities_notice_media", {
        notice_id: DataTypes.INTEGER,
       file_id: DataTypes.INTEGER
    }, {
        tableName:'communities_notice_media',
        timestamps: false
    });
    return notice_file;
}
