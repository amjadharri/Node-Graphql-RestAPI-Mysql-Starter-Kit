import statusCodes from 'http-status-codes';
export default function (obj) {
  let { data, req, res, body } = obj;
  if (data.hasOwnProperty('statusCode')) {
    res.json(data);
    return;
  }
  res.status(statusCodes[data.statusCode]).json(data);
  return;
}