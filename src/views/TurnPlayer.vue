<template>
  <SideBar :navigationState="navigationState"/>
  <h1>{{t('player.player')}}</h1>

  <p class="mt-4" v-html="t('roundTurnPlayer.execute')"></p>

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

export default defineComponent({
  name: 'TurnPlayer',
  components: {
    FooterButtons,
    SideBar,
    DebugInfo
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
  computed: {
    backButtonRouteTo() : string {
      if (this.turn == 1) {
        return ''
      }
      return `/turn/${this.turn-1}/bot`
    }
  },
  methods: {
    next() {
      this.state.storeTurn({
        turn: this.turn,
        player: this.navigationState.player,
        botPersistence: {
          cardDeck: this.navigationState.cardDeck.toPersistence(),
          botResources: this.navigationState.botResources
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
