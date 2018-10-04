import Controller from "./Controller.js";
import findBody from "../../framework/helpers/findBody.js";
import response from "../../framework/helpers/response.js";

class ForgetPasswordRestApi {
  async requestPasswordResetToken(req, res) {
    let body = findBody(req);
    let data = await Controller.requestPasswordResetToken(null, body);
    response({
      data, req, res, body
    })
  }
  async resetPassword(req, res) {
    let body = findBody(req);
    let data = await Controller.resetPassword(null, body);
    response({
      data, req, res, body
    })
  }

}


export default new ForgetPasswordRestApi;