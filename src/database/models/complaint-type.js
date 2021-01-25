module.exports = (sequelize, DataTypes) => {
  const ComplaintType = sequelize.define('ComplaintType', {
    type: DataTypes.STRING
  }, {});
  ComplaintType.associate = (models) => {
    // associations can be defined here
    ComplaintType.hasOne(models.Complaint, {
      as: 'complaint',
      foreignKey: 'complaint_typeId',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  };
  return ComplaintType;
};
