'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserNotification extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
    };
    
  UserNotification.init({
    uuid: {
      type: DataTypes.UUID, 
      allowNull: false
      },
    userUuid: {
      type: DataTypes.UUID, 
      primaryKey: true,
      field:"user_uuid"   
      },
    dAppUuid: {
      type: DataTypes.UUID, 
      primaryKey: true,
      field:"d_app_uuid"      
      },
    notificationsUuid: {
      type: DataTypes.UUID, 
      primaryKey: true, 
      field:"notifications_uuid" 
    }
  }, {
    tableName: 'user_notifications',
    underscored: true,
    timestamps: true,
    paranoid: true,
    deletedAt: 'deleted_at',
    sequelize,
    modelName: 'UserNotification',
    indexes: [
      // Create a unique index on email
      {
        unique: true,
        fields: ['user_uuid', 'd_app_uuid','notifications_uuid']
      }
    ]
  });
    
  UserNotification.associate = (models) =>{
    UserNotification.belongsTo(models.DApp, { foreignKey: 'd_app_uuid' });
    UserNotification.belongsTo(models.Notification, { foreignKey: 'notifications_uuid' });
    UserNotification.belongsTo(models.User, { foreignKey: 'user_uuid' });      
  }
  return UserNotification;
};