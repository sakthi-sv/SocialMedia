require("dotenv").config();
const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models").users;

class UserController {
  generateAccessToken = (id) =>
    jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });

  updateUser = (id, refreshToken) => {
    return User.update(
      {
        refreshToken: refreshToken,
      },
      {
        where: {
          id,
        },
      }
    );
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
          if (!result.refreshToken) {
            const refreshToken = jwt.sign(
              result.id,
              process.env.REFRESH_TOKEN_SECRET
            );
            const accessToken = this.generateAccessToken(result.id);
            console.log(accessToken, refreshToken);
            this.updateUser(result.id, refreshToken);
            callBack(201, {
              accessToken: accessToken,
              refreshToken: refreshToken,
            });
          } else {
            const accessToken = this.generateAccessToken(result.id);
            callBack(201, {
              accessToken: accessToken,
              refreshToken: result.refreshToken,
            });
          }
        }
      } else callBack(403, {});
    });
  }
  getToken(data, callBack) {
    console.log(data);
    let { id } = data;
    const accessToken = this.generateAccessToken(data.id);
    callBack(201, { accessToken: accessToken });
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
        User.create({
          name,
          password,
        }).then((userdetail) => {
          console.log(userdetail);
          const accessToken = this.generateAccessToken(userdetail.id);
          const refreshToken = jwt.sign(
            { id: userdetail.id },
            process.env.REFRESH_TOKEN_SECRET
          );
          this.updateUser(userdetail.id, refreshToken);
          callBack(201, {
            accessToken: accessToken,
            refreshToken: refreshToken,
          });
        });
      }
    });
  }
}

module.exports = () => {
  return new UserController();
};
