import statusCodes from 'http-status-codes';
export default function (obj) {
  let { data, req, res, body } = obj;
  res.status(statusCodes[data.statusCode]).json(data);
}