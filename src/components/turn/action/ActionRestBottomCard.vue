<template>
  <ActionBox :action="action" :instruction-title="t('rules.action.restBottomCard.title')">
    <template #action>
      <div class="action">
        <AppIcon name="rest" class="icon"/>
        <div class="fw-bold">{{t('rules.action.restBottomCard.title')}}</div>
      </div>
    </template>
    <template #instruction>
      <p v-html="t('rules.action.restBottomCard.instruction')"/>
    </template>
  </ActionBox>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import { CardAction } from '@/services/Card'
import ActionBox from '../ActionBox.vue'
import NavigationState from '@/util/NavigationState'
import AppIcon from '@/components/structure/AppIcon.vue'

export default defineComponent({
  name: 'ActionRestBottomCard',
  inheritAttrs: false,
  components: {
    ActionBox,
    AppIcon
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
  }
})
</script>

<style lang="scss" scoped>
.action {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 10px;
}
.icon {
  height: 2rem;
}
</style>
