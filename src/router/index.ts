import { RouteRecordRaw } from 'vue-router'
import createRouterMatomoTracking from '@brdgm/brdgm-commons/src/util/router/createRouterMatomoTracking'
import { name, version, appDeployName } from '@/../package.json'
import AppHome from '@/views/AppHome.vue'
import NotFound from '@/views/NotFound.vue'
import SetupApp from '@/views/SetupApp.vue'
import SetupBot from '@/views/SetupBot.vue'
import TurnPlayer from '@/views/TurnPlayer.vue'
import TurnBot from '@/views/TurnBot.vue'
import GameEnd from '@/views/GameEnd.vue'

const LOCALSTORAGE_KEY = `${name}.route`

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'AppHome',
    component: AppHome
  },
  { 
    path: '/setup',
    name: 'SetupApp',
    component: SetupApp
  },
  {
    path: '/setupBot',
    name: 'SetupBot',
    component: SetupBot
  },
  {
    path: '/turn/:turn/player',
    name: 'TurnPlayer',
    component: TurnPlayer
  },
  {
    path: '/turn/:turn/bot',
    name: 'TurnBot',
    component: TurnBot
  },
  {
    path: '/turn/:turn/bot/action/:action',
    name: 'TurnBotAction',
    component: TurnBot
  },
  {
    path: '/gameEnd',
    name: 'GameEnd',
    component: GameEnd
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  }
]

export default createRouterMatomoTracking(routes, LOCALSTORAGE_KEY, appDeployName, version, 'AppHome')