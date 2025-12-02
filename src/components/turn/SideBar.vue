<template>
  <div class="sidebar">
    {{t('sideBar.turn', {turn})}}
    <div class="metric">
      <div class="label"><AppIcon name="resource-tracker" class="icon"/></div>
      <div>{{ navigationState.botResources.resourceTrack+1 }}</div>
    </div>
    <div class="metric">
      <div class="label">
        <AppIcon name="dice-white" class="icon dice"/>
        <span>-</span>
        <AppIcon name="dice-color-any" class="icon dice"/>
      </div>
      <div>{{ navigationState.botResources.diceSum }}</div>
    </div>
    <div class="metric">
      <div class="label"><AppIcon name="scheme-cards-blue" class="icon cards"/></div>
      <div>{{ cardDeck.discardBlueCount }}</div>
    </div>
    <div class="metric">
      <div class="label"><AppIcon name="scheme-cards-red" class="icon cards"/></div>
      <div>{{ cardDeck.discardRedCount }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStateStore } from '@/store/state'
import NavigationState from '@/util/NavigationState'
import CardDeck from '@/services/CardDeck'
import AppIcon from '../structure/AppIcon.vue'

export default defineComponent({
  name: 'SideBar',
  components: {
    AppIcon
  },
  setup() {
    const { t } = useI18n()
    const state = useStateStore()
    return { t, state }
  },
  props: {
    navigationState: {
      type: NavigationState,
      required: true
    }
  },
  computed: {
    turn() : number {
      return this.navigationState.turn
    },
    cardDeck() : CardDeck {
      return this.navigationState.cardDeck
    }
  }
})
</script>

<style lang="scss" scoped>
.sidebar {
  float: right;
  width: 145px;
  margin-left: 15px;
  margin-bottom: 10px;
  margin-right: -12px;
  padding: 15px 10px 15px 15px;
  background-color: #ddd;
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
  @media (max-width: 600px) {
    font-size: 0.9rem;
    width: 120px;
  }
}
.metric {
  display: flex;
  width: 60px;
  justify-content: space-between;
  margin-top: 10px;
  .label {
    display: flex;
    width: 40px;
    align-items: center;
    justify-content: center;
  }
}
.icon {
  height: 1.75rem;
  &.cards {
    margin-top: -0.25rem;
  }
  &.dice {
    height:1rem;
    filter: drop-shadow(1px 0 0 white)
      drop-shadow(-0.5px 0 0 white)
      drop-shadow(0 1px 0 white)
      drop-shadow(0 -0.5px 0 white);
  }
}
</style>
