import Base from './components/Base.jsx';
import HomePage from './components/HomePage.jsx';
import DashboardPage from './containers/DashboardPage.jsx';
import LoginPage from './containers/LoginPage.jsx';
import SignUpPage from './containers/SignUpPage.jsx';
import AuthUser from './utils/AuthUser';
import NewPage from './containers/NewPage.jsx';
import Pages from './containers/Pages.jsx';
import ShowPageContainer from './containers/ShowPageContainer.jsx';

const routes = {
  // base component (wrapper for the whole application).
  component: Base,
  childRoutes: [

    {
      path: '/',
      getComponent: (location, callback) => {
        if (AuthUser.isUserAuthenticated()) {
          callback(null, DashboardPage);
        } else {
          callback(null, HomePage);
        }
      }
    },

    {
      path: '/login',
      component: LoginPage,
       onEnter: (nextState, replace) => {
        if(AuthUser.isUserAuthenticated()){
          replace('/');
        }
        // change the current URL to /
      }

    },

    {
      path: '/signup',
      component: SignUpPage,
      onEnter: (nextState, replace) => {
        if(AuthUser.isUserAuthenticated()){
          replace('/');
        }
        // change the current URL to /
      }
    },

    {
      path: '/logout',
      onEnter: (nextState, replace) => {
        AuthUser.deauthenticateUser();

        // change the current URL to /
        replace('/login');
      }
    },


    {
      path: '/newpage',
      component: NewPage,
      onEnter: (nextState, replace) => {
        if(!AuthUser.isUserAuthenticated()){
          replace('/login');
        }
      }
    },

    {
      path: '/pages',
      component: Pages,
      onEnter: (nextState, replace) => {
        if(!AuthUser.isUserAuthenticated()){
          replace('/login');
        }
      }
    },
    
    {
      path: '/pages/:id',
      component: ShowPageContainer,
      onEnter: (nextState, replace) => {
        if(!AuthUser.isUserAuthenticated()){
          replace('/login');
        }
      }
    }

  ]
};

export default routes;