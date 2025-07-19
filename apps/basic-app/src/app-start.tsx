import { startCorract } from 'corract/start'
import { routes } from './app-def'
import { Client } from './app-client'

startCorract({
  routeConfig: routes,
  client: <Client/>,
})
