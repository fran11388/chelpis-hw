const sequelize = require('../services/sequelize');
const {Sequelize, DataTypes} = require('sequelize');

const User = sequelize.define('users', {
  // Model attributes are defined here
  userId: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4, // Or Sequelize.UUIDV1
    primaryKey: true,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING(),
    allowNull: false
  },
  name: {
    type: DataTypes.STRING
    // allowNull defaults to true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false
  },
  score: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
  reviewer: {
    type: DataTypes.STRING,
    defaultValue: '',
  },
  createdAt: {
    type: 'TIMESTAMP',
    allowNull: false
  },
  updatedAt: {
    type: 'TIMESTAMP',
    allowNull: false
  },


}, {
  // Other model options go here
});

User.sync({alter: true});

User.queryByRole = async ({role, limit, offset}) => {
  const sql = `select * from users
where role='${role}'
ORDER BY createdAt DESC
limit ${limit}
OFFSET ${offset}
`;
  const [results, metadata] = await sequelize.query(sql);
  return results;
}

module.exports = User;