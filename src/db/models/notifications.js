'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Notification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // this.belongsTo(models.DApps, {foreignKey: 'd_app_uuid', as: 'DApps' })
    }
  };
  Notification.init({
    uuid: {
      type: DataTypes.UUID, 
      primaryKey: true, 
      allowNull: false
    },
    dAppUuid: {
      type: DataTypes.UUID,
      allowNull: false,
      field:"d_app_uuid"
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    shortDescription: {
      type: DataTypes.STRING,
      allowNull: false
    },
    longDescription: DataTypes.TEXT
  }, {
    tableName: 'notifications',
    underscored: true, 
    sequelize,
      modelName: 'Notification',
  });

  Notification.associate = (models) =>{
    Notification.belongsTo(models.DApp, { foreignKey: 'd_app_uuid' });
  }
  return Notification;
};