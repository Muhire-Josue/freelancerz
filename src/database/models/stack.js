module.exports = (sequelize, DataTypes) => {
  const Stack = sequelize.define('Stack', {
    tech: DataTypes.STRING
  }, {});
  Stack.associate = (models) => {
    // associations can be defined here
    Stack.belongsTo(models.Job, {
      as: 'stack',
      foreignKey: 'stackId',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE'
    });
  };
  return Stack;
};
