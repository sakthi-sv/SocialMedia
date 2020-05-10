require("dotenv").config();
const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models").users;

class UserController {
  generateToken = (id) => jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET);

  updateUser = (id, activeToken) => {
    return User.update(
      {
        activeToken: activeToken,
      },
      {
        where: {
          id,
        },
      }
    );
  };
  getId = async (activeToken) => {
    let promise = await User.findOne({
      attributes: ["id"],
      where: {
        activeToken,
      },
    });

    return promise;
  };
  async signOut(data, callBack) {
    await this.updateUser(data.id, null);
    callBack(204, "updated");
  }

  async signIn(data, callBack) {
    User.findOne({
      where: {
        name: data.name,
      },
    }).then((result) => {
      if (result) {
        if (bcrypt.compare(data.password, result.password)) {
          if (!result.activeToken) {
            const activeToken = this.generateToken(result.id);
            console.log(activeToken);
            this.updateUser(result.id, activeToken);
            callBack(201, { activeToken });
          } else callBack(201, { activeToken: result.activeToken });
        }
      } else callBack(403, {});
    });
  }
  async signUp(data, callBack) {
    let { name, password } = data;
    var id;
    password = await bcrypt.hash(password, 10);
    User.findOne({
      attributes: ["id"],
      where: {
        name,
      },
    }).then((result) => {
      if (result) callBack(409, result);
      else {
        const userdetail = User.create({
          name,
          password,
        });
        console.log(userdetail);
        const activeToken = this.generateToken(userdetail.id);
        this.updateUser(userdetail.id, activeToken);
        callBack(201, { activeToken });
      }
    });
  }
}

module.exports = () => {
  return new UserController();
};
