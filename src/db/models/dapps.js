'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DApp extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // this.hasMany(models.Notifications, { as: "Notifications" });
    }
  };
  DApp.init({
    uuid: {
      type: DataTypes.UUID, 
      primaryKey: true, 
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: DataTypes.TEXT,
    logoUrl: {
      type: DataTypes.STRING, 
      allowNull: false
    }
  }, {
    tableName: 'dapps',
    underscored: true, 
    sequelize,
      modelName: 'DApp',
  });

  DApp.associate = (models) =>{
    DApp.hasMany(models.Notification, { as: "Notifications" });
  }
  return DApp;
};