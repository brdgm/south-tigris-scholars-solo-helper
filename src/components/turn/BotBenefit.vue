<template>
  <p>
    benefit: <b>{{ benefit }}</b>
  </p>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import Benefit from '@/services/enum/Benefit'

export default defineComponent({
  name: 'BotBenefit',
  setup() {
    const { t } = useI18n()
    return { t }
  },
  props: {
    benefit: {
      type: Object as PropType<Benefit>,
      required: true
    }
  }
})
</script>
