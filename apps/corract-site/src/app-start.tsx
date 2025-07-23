import { startCorract } from 'corract/start'
import { pages } from './app-def'
import { Client } from './app-client'

startCorract({
  pages: pages,
  client: <Client/>,
  port: 7000,
})
