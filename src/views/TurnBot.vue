<template>
  <SideBar :navigationState="navigationState"/>
  <h1>
    {{t('turnBot.title')}}
    <span v-if="botActions?.isRest">[REST]</span>
  </h1>

  <template v-if="botActions">
    <BotBenefit v-if="botActions.benefit" :benefit="botActions.benefit"/>
    <BotAction :action="currentAction"/>
  </template>

  <PlayerPaySilver v-model="playerPaySilver"/>
  <BotBenefit v-if="additionalResourceTrackBenefit" :benefit="additionalResourceTrackBenefit"/>

  <button class="btn btn-success btn-lg mt-4 me-2" @click="next()">
    {{t('turnBot.executed')}}
  </button>
  <button class="btn btn-danger btn-lg mt-4 me-2" @click="notPossible()" v-if="isChoiceAction">
    {{t('turnBot.notPossible')}}
  </button>

  <DebugInfo :navigationState="navigationState"/>

  <FooterButtons :backButtonRouteTo="backButtonRouteTo" endGameButtonType="endGame"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute, useRouter } from 'vue-router'
import NavigationState from '@/util/NavigationState'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import { useStateStore } from '@/store/state'
import SideBar from '@/components/turn/SideBar.vue'
import DebugInfo from '@/components/turn/DebugInfo.vue'
import PlayerPaySilver from '@/components/turn/PlayerPaySilver.vue'
import Benefit from '@/services/enum/Benefit'
import getResourceTrackBenefit from '@/util/getResourceTrackBenefit'
import addResourceTrack from '@/util/addResourceTrack'
import toNumber from '@brdgm/brdgm-commons/src/util/form/toNumber'
import BotBenefit from '@/components/turn/BotBenefit.vue'
import BotAction from '@/components/turn/BotAction.vue'
import { CardAction } from '@/services/Card'

export default defineComponent({
  name: 'TurnBot',
  components: {
    FooterButtons,
    SideBar,
    DebugInfo,
    PlayerPaySilver,
    BotBenefit,
    BotAction
  },
  setup() {
    const { t } = useI18n()
    const router = useRouter()
    const route = useRoute()
    const state = useStateStore()

    const navigationState = new NavigationState(route, state)
    const { turn, action, botActions } = navigationState

    return { t, router, navigationState, state, turn, action, botActions }
  },
  data() {
    return {
      playerPaySilver: 0
    }
  },
  computed: {
    backButtonRouteTo() : string {
      return `/turn/${this.turn-1}/player`
    },
    allActions() : CardAction[] {
      return this.botActions?.actions ?? []
    },
    currentAction() : CardAction {
      return this.allActions[this.action]
    },
    isChoiceAction() : boolean {
      return this.action % 2 == 0
    },
    additionalResourceTrackBenefit() : Benefit|undefined {
      return getResourceTrackBenefit(this.navigationState.botResources.resourceTrack, toNumber(this.playerPaySilver),
          this.navigationState.botResources.resourceTrackBenefitsClaimed)
    }
  },
  methods: {
    notPossible() : void {
      this.router.push(`/turn/${this.turn}/bot/action/${this.action+1}`)
    },
    next() : void {
      this.state.storeTurn({
        turn: this.turn,
        player: this.navigationState.player,
        botPersistence: {
          cardDeck: this.navigationState.cardDeck.toPersistence(),
          botResources: addResourceTrack(this.navigationState.botResources, toNumber(this.playerPaySilver))
        }
      })
      this.router.push(`/turn/${this.turn+1}/player`)
    }
  }
})
</script>

<style lang="scss" scoped>
.icon {
  height: 4rem;
}
</style>
