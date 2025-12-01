<template>
  <SideBar :navigationState="navigationState"/>
  <h1>{{t('turnPlayer.title')}}</h1>

  <p class="mt-4" v-html="t('turnPlayer.execute')"></p>

  <PlayerPaySilver v-model="playerPaySilver"/>

  <div v-if="additionalResourceTrackBenefit" class="mt-3">
    [{{additionalResourceTrackBenefit}}]
  </div>

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
import PlayerPaySilver from '@/components/turn/PlayerPaySilver.vue'
import Benefit from '@/services/enum/Benefit'
import getResourceTrackBenefit from '@/util/getResourceTrackBenefit'
import addResourceTrack from '@/util/addResourceTrack'

export default defineComponent({
  name: 'TurnPlayer',
  components: {
    FooterButtons,
    SideBar,
    DebugInfo,
    PlayerPaySilver
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
      playerPaySilver: 0
    }
  },
  computed: {
    backButtonRouteTo() : string {
      if (this.turn == 1) {
        return ''
      }
      return `/turn/${this.turn-1}/bot`
    },
    additionalResourceTrackBenefit() : Benefit|undefined {
      const resourceTackOld = this.navigationState.botResources.resourceTrack
      const resourceTrackNew = resourceTackOld + this.playerPaySilver
      return getResourceTrackBenefit(resourceTackOld, resourceTrackNew,
          this.navigationState.botResources.resourceTrackBenefitsClaimed)
    }
  },
  methods: {
    next() {
      this.state.storeTurn({
        turn: this.turn,
        player: this.navigationState.player,
        botPersistence: {
          cardDeck: this.navigationState.cardDeck.toPersistence(),
          botResources: addResourceTrack(this.navigationState.botResources, this.playerPaySilver)
        }
      })
      this.router.push(`/turn/${this.turn+1}/bot`)
    }
  }
})
</script>

<style lang="scss" scoped>
.icon {
  height: 4rem;
}
</style>
