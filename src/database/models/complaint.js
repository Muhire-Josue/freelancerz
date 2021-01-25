module.exports = (sequelize, DataTypes) => {
  const Complaint = sequelize.define('Complaint', {
    complainer: DataTypes.STRING,
    complainee: DataTypes.STRING,
    description: DataTypes.STRING,
    complaint_typeId: DataTypes.INTEGER
  }, {});
  Complaint.associate = (models) => {
    // associations can be defined here
    Complaint.belongsTo(models.ComplaintType, {
      as: 'complaint',
      foreignKey: 'complaint_typeId',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
  };
  return Complaint;
};
