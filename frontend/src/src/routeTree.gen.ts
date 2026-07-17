import { Route as rootRoute } from './routes/__root'
import { Route as IndexRoute } from './routes/index'
import { Route as ProfileRoute } from './routes/profile'
import { Route as SettingsRoute } from './routes/settings'
import { Route as DraftsRoute } from './routes/drafts'
import { Route as ForgotPasswordRoute } from './routes/forgot-password'

const routeTree = rootRoute.addChildren([
  IndexRoute,
  ProfileRoute,
  SettingsRoute,
  DraftsRoute,
  ForgotPasswordRoute,
])

export { routeTree }
