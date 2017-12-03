import App from './App';
import Login from '/Login';

const routes = {
  childRoutes: [

    {
      path: '/',
      component: App
    },

    {
      path: '/login',
      component: Login
    }
  ]
};

export default routes;