<template>
  <SideBar :navigationState="navigationState"/>
  <h1>
    {{t('turnBot.title')}}
    <AppIcon v-if="botActions?.isRest" name="rest" class="restIcon"/>
  </h1>

  <template v-if="botActions">
    <template v-if="isRest">
      <BotAction v-for="(action,index) of allActions" :key="index" :action="action" :navigationState="navigationState"/>
    </template>
    <template v-else>
      <BotAction :action="currentAction" :navigationState="navigationState"/>
    </template>
    <BotAction v-if="botActions.benefit" :action="botActions.benefit" :navigationState="navigationState"/>
  </template>

  <BotSilver v-model="botSilver"/>
  <BotAction v-if="additionalResourceTrackBenefit" :action="additionalResourceTrackBenefit" :navigationState="navigationState"/>

  <template v-if="hasMoreActions">
    <button class="btn btn-success btn-lg mt-4 me-2" @click="next()">
      {{t('turnBot.executed')}}
    </button>
    <button class="btn btn-danger btn-lg mt-4 me-2" @click="notPossible()">
      {{t('turnBot.notPossible')}}
    </button>
  </template>
  <template v-else>
    <button class="btn btn-primary btn-lg mt-4 me-2" @click="next()">
      {{t('action.next')}}
    </button>
  </template>

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
import BotSilver from '@/components/turn/BotSilver.vue'
import getResourceTrackBenefit from '@/util/getResourceTrackBenefit'
import addResourceTrack from '@/util/addResourceTrack'
import toNumber from '@brdgm/brdgm-commons/src/util/form/toNumber'
import BotAction from '@/components/turn/BotAction.vue'
import { CardAction } from '@/services/Card'
import AppIcon from '@/components/structure/AppIcon.vue'

export default defineComponent({
  name: 'TurnBot',
  components: {
    FooterButtons,
    SideBar,
    DebugInfo,
    BotSilver,
    BotAction,
    AppIcon
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
      botSilver: undefined as number|undefined
    }
  },
  computed: {
    backButtonRouteTo() : string {
      return `/turn/${this.turn-1}/player`
    },
    isRest() : boolean {
      return this.botActions?.isRest ?? false
    },
    allActions() : CardAction[] {
      return this.botActions?.actions ?? []
    },
    currentAction() : CardAction {
      return this.allActions[this.action]
    },
    hasMoreActions() : boolean {
      return this.allActions.length > this.action + 1 && !this.isRest
    },
    additionalResourceTrackBenefit() : CardAction|undefined {
      return getResourceTrackBenefit(this.navigationState.botResources.resourceTrack, toNumber(this.botSilver),
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
          botResources: addResourceTrack(this.navigationState.botResources, toNumber(this.botSilver) + (this.currentAction.silverBonus ?? 0))
        }
      })
      this.router.push(`/turn/${this.turn+1}/player`)
    }
  }
})
</script>

<style lang="scss" scoped>
.restIcon {
  height: 2.5rem;
  margin-top: -0.5rem;
}
</style>
