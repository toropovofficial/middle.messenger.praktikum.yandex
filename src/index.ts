/* eslint-disable no-tabs */
import LoginPage from './pages/SignIn/index';
import { RegistartionPage } from './pages/SignUp/index';
import ProfilePage from './pages/Profile/index';
import ChangeProfilePage from './pages/ChangeProfile/index';
import changePasswordPage from './pages/ChangePassword/index';
import Messenger from './pages/Messenger/index';
import './utils/HTTPTransport';
import Router from './utils/Router';
import AuthController from './controllers/AuthController';
import ChatController from './controllers/ChatController';
// eslint-disable-next-line import/extensions
import { store } from './utils/Store';
import './styles/style.scss';

const initApp = async () => {
  const router = new Router('#root');
  router
    .use('/sign-in', LoginPage)
    .use('/sign-up', RegistartionPage)
    .use('/profile', ProfilePage)
    .use('/messenger', Messenger)
    .use('/settings', ChangeProfilePage)
    .use('/settings/password', changePasswordPage);

  globalThis.$router = router;

  try {
    await AuthController.fetchUser();

    await ChatController.getChats();

    router.start();

    const path = document.location.pathname;

    switch (true) {
      case path === '/':
        router.go('/messenger');
        break;
      case path === '/sign-in':
        router.go('/messenger');
        break;
      case path === '/sign-up':
        router.go('/messenger');
        break;
      default:
        break;
    }
  } catch (error) {
    store.set('showModal', true);
    router.go('/sign-in');
  }
};

initApp();
