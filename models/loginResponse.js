module.exports = (sequelize, DataTypes) => {
  const LoginResponse = sequelize.define('LoginResponse', {
    id: {
        primaryKey: true,
        type:DataTypes.STRING
    },
    firstName:DataTypes.STRING,
    lastName:DataTypes.STRING,
    token: DataTypes.STRING
  }, {});
  LoginResponse.associate = function(models) {
    // associations can be defined here
  };
  return LoginResponse;
};