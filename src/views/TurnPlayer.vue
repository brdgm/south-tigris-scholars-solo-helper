<template>
  <SideBar :navigationState="navigationState" @caliphActions="actions => caliphActions.push(...actions)" @caliphOptionsRemove="caliphActions=[]"/>
  <h1>{{t('turnPlayer.title')}}</h1>

  <p class="mt-4" v-html="t('turnPlayer.execute')"></p>

  <BotSilver v-model="botSilver"/>
  <BotAction v-if="additionalResourceTrackBenefit" :action="additionalResourceTrackBenefit" :navigationState="navigationState"/>
  <BotAction v-for="(action, index) in caliphActions" :key="index" :action="action" :navigationState="navigationState"/>

  <button class="btn btn-primary btn-lg mt-4" @click="next">
    {{t('action.next')}}
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
import BotSilver from '@/components/turn/BotSilver.vue'
import getResourceTrackBenefit from '@/util/getResourceTrackBenefit'
import addResourceTrack from '@/util/addResourceTrack'
import toNumber from '@brdgm/brdgm-commons/src/util/form/toNumber'
import { CardAction } from '@/services/Card'
import BotAction from '@/components/turn/BotAction.vue'
import addDiceSum from '@/util/addDiceSum'
import addResourceTrackBenefitsClaimed from '@/util/addResourceTrackBenefitsClaimed'

export default defineComponent({
  name: 'TurnPlayer',
  components: {
    FooterButtons,
    SideBar,
    DebugInfo,
    BotSilver,
    BotAction
  },
  setup() {
    const { t } = useI18n()
    const router = useRouter()
    const route = useRoute()
    const state = useStateStore()

    const navigationState = new NavigationState(route, state)
    const { turn } = navigationState

    return { t, router, navigationState, state, turn }
  },
  data() {
    return {
      botSilver: undefined as number|undefined,
      caliphActions: [] as CardAction[]
    }
  },
  computed: {
    backButtonRouteTo() : string {
      if (this.turn == 1) {
        return ''
      }
      return `/turn/${this.turn-1}/bot`
    },
    additionalResourceTrackBenefit() : CardAction|undefined {
      return getResourceTrackBenefit(this.navigationState.botResources.resourceTrack, toNumber(this.botSilver),
          this.navigationState.botResources.resourceTrackBenefitsClaimed)
    },
    caliphActionsSilverBonus() : number {
      return this.caliphActions.reduce((sum, action) => sum + (action.silverBonus ?? 0), 0)
    },
    caliphActionsDiceSumModifier() : number {
      return this.caliphActions.reduce((sum, action) => sum + (action.diceSumModifier ?? 0), 0)
    }
  },
  methods: {
    next() {
      this.state.storeTurn({
        turn: this.turn,
        player: this.navigationState.player,
        botPersistence: {
          cardDeck: this.navigationState.cardDeck.toPersistence(),
          botResources: addResourceTrackBenefitsClaimed(addDiceSum(addResourceTrack(this.navigationState.botResources, toNumber(this.botSilver) + this.caliphActionsSilverBonus),
              this.caliphActionsDiceSumModifier), this.additionalResourceTrackBenefit)
        }
      })
      this.router.push(`/turn/${this.turn+1}/bot`)
    }
  }
})
</script>
