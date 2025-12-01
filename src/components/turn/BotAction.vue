<template>
  <p>
    action: <b>{{ action }}</b>
  </p>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import Action from '@/services/enum/Action'

export default defineComponent({
  name: 'BotAction',
  setup() {
    const { t } = useI18n()
    return { t }
  },
  props: {
    action: {
      type: Object as PropType<Action>,
      required: true
    }
  }
})
</script>
