<template>
  <SideBar :navigationState="navigationState"/>
  <h1>{{t('player.bot')}}</h1>

  <p>...</p>

  <button class="btn btn-success btn-lg mt-4 me-2" @click="next()">
    {{t('roundTurnBot.executed')}}
  </button>

  <button class="btn btn-danger btn-lg mt-4 me-2" @click="next()">
    {{t('roundTurnBot.notPossible')}}
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
  name: 'TurnBot',
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
      return `/turn/${this.turn-1}/player`
    },
  },
  methods: {
    next() : void {
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
