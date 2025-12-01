<template>
  <div v-if="action.requireEmployedTranslators" style="color:red"> 
    requireEmployedTranslators: <b>{{action.requireEmployedTranslators}}</b>
  </div>
  <div v-if="action.requireScrollCardsHouseOfWisdom" style="color:red"> 
    requireScrollCardsHouseOfWisdom: <b>{{action.requireScrollCardsHouseOfWisdom}}</b>
  </div>
  <div v-if="action.anyInfluenceBonus" style="color:green"> 
    influenceBonus: <b>any</b>
  </div>
  <div v-if="action.silverBonus" style="color:green"> 
    silverBonus: <b>{{action.silverBonus}}</b>
  </div>
  <div>
    action: <b>{{ action.action }}</b>
  </div>
  <div v-if="action.travelInfluence"> 
    travelInfluence: <b>{{ action.travelInfluence }}</b>
  </div>
  <div v-if="action.retireTranslator"> 
    retireTranslator: <b>{{ action.retireTranslator }}</b>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import { CardAction } from '@/services/Card'

export default defineComponent({
  name: 'BotAction',
  setup() {
    const { t } = useI18n()
    return { t }
  },
  props: {
    action: {
      type: Object as PropType<CardAction>,
      required: true
    }
  }
})
</script>
