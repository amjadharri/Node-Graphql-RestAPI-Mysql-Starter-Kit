export default function findBody(req) {
  let {body,method,params} = req;
  return {...body,...params};
}