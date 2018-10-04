import Controller from "./Controller.js";
import findBody from "../../framework/helpers/findBody.js";
import response from "../../framework/helpers/response.js";

class UserRestApi {
  async login(req, res) {
    let body = findBody(req);
    let data = await Controller.login(null, body);
    response({
      data, req, res, body
    })
  }

  async signup(req, res) {
    let body = findBody(req);
    let data = await Controller.signup(null, body);
    response({
      data, req, res, body
    })
  }

  async updateProfile(req, res) {
    let body = findBody(req);
    let data = await Controller.updateProfile(null, body);
    response({
      data, req, res, body
    })
  }

  async userView(req, res) {
    let body = findBody(req);
    let data = await Controller.userView(null, body);
    response({
      data, req, res, body
    })
  }

  async changePassword(req, res) {
    let body = findBody(req);
    let data = await Controller.changePassword(null, body);
    response({
      data, req, res, body
    })
  }
}


export default new UserRestApi;