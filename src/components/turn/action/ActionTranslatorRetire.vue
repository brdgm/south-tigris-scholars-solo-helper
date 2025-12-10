<template>
  <ActionBox :action="action" :instruction-title="t('rules.action.translatorRetire.title')" :navigationState="navigationState">
    <template #action>
      <div class="action">
        <AppIcon v-if="action.retireTranslator" type="translator" :name="`${action.retireTranslator}`" extension="webp" class="icon translator"/>
        <AppIcon type="action" :name="action.action" class="icon"/>
      </div>
    </template>
    <template #instruction>
      <p v-if="action.retireTranslator" v-html="t('rules.action.translatorRetire.instruction')"/>
      <p v-else v-html="t('rules.action.translatorRetire.highestVP')"/>
    </template>
  </ActionBox>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import { CardAction } from '@/services/Card'
import ActionBox from '../ActionBox.vue'
import AppIcon from '@/components/structure/AppIcon.vue'
import NavigationState from '@/util/NavigationState'

export default defineComponent({
  name: 'ActionTranslatorRetire',
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
  height: 3rem;
  z-index: 10;
  &.translator {
    margin-right: -1.75rem;
    margin-bottom: 0.5rem;
    z-index: 5;
    filter: drop-shadow(1px 0 0 white)
      drop-shadow(-1px 0 0 white)
      drop-shadow(0 1px 0 white)
      drop-shadow(0 -1px 0 white);
  }
}
</style>
