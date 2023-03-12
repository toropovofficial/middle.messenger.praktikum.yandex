import login from './pages/login/index'
import registration from './pages/registration/index'
import viewProfile from './pages/viewProfile/index'
import changeProfile from './pages/changeProfile/index'
import changePassword from './pages/changePassword/index'
import chat from './pages/chat/index'
import error404 from './pages/404/index'
import error500 from './pages/500/index'

export const App = () => {
  switch (document.location.pathname) {
    case '/registration':
      return registration
    case '/login':
      return login
    case '/viewProfile':
      return viewProfile 
    case '/changeProfile':
      return changeProfile
    case '/changePassword':
      return changePassword
    case '/chat':
      return chat
    case '/404':
      return error404
    case '/500':
      return error500
    default:
      return login
  }
}
