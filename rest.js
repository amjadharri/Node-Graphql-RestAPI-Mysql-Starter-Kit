import routes from './app/RestApi.js';
export default function (app) {
  console.log('starting rest service');
  routes(app);
  console.log('Rest service started');
}