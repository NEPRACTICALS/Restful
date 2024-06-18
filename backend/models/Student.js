

const { DataTypes, Model } = require("sequelize");
const jwt = require("jsonwebtoken");
const sequelize = require("../middleware/sequelize");

class Student extends Model {
  async generateAuthToken() {
    const token = jwt.sign({ id: this.id }, process.env.SECRET, {
      expiresIn: "1h"
    });
    return token;
  }
}

Student.init(
  {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: "Student"
  }
);

module.exports = Student;
