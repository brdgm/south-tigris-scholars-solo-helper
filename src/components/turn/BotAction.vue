<template>
  <div class="actionItem">
    <component :is="componentName" :action="action" :navigationState="navigationState"/>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import { CardAction } from '@/services/Card'
import ActionTranslatorPlaceGold from './action/ActionTranslatorPlaceGold.vue'
import ActionTranslatorEmploy from './action/ActionTranslatorEmploy.vue'
import ActionTranslatorRetire from './action/ActionTranslatorRetire.vue'
import ActionTranslate from './action/ActionTranslate.vue'
import ActionTravel from './action/ActionTravel.vue'
import ActionInfluenceCard from './action/ActionInfluenceCard.vue'
import ActionInfluence from './action/ActionInfluence.vue'
import NavigationState from '@/util/NavigationState'

export default defineComponent({
  name: 'BotAction',
  components: {
    ActionTranslatorPlaceGold,
    ActionTranslatorEmploy,
    ActionTranslatorRetire,
    ActionTranslate,
    ActionTravel,
    ActionInfluence,
    ActionInfluenceCard
  },
  setup() {
    const { t } = useI18n()
    return { t }
  },
  props: {
    action: {
      type: Object as PropType<CardAction>,
      required: true
    },
    navigationState: {
      type: NavigationState,
      required: true
    }
  },
  computed: {
    componentName() : string {
      return `action-${this.action.action}`
    }
  }
})
</script>

<style lang="scss" scoped>
.actionItem {
  margin-top: 15px;
  max-width: 32rem;
  padding-right: 10rem;
  @media (max-width: 600px) {
    padding-right: 8rem;
  }
}
</style>
