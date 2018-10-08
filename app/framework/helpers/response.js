import statusCodes from 'http-status-codes';
export default function (obj) {
  let { data, req, res, body } = obj;
  if (data.hasOwnProperty('statusCode')) {
    res.json(data);
    return;
  }
  console.log("You didn't provide status please provide status code for this Rest/GraphQL call.")
  res.status(statusCodes[data.statusCode]).json(data);
  return;
}