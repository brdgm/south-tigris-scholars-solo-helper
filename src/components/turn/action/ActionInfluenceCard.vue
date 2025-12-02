<template>
  <ActionBox :action="action" :instruction-title="t('rules.action.influenceCard.title')">
    <template #action>
      <div class="action">
        <AppIcon type="action" :name="action.action" class="icon"/>
      </div>
    </template>
    <template #priority>
      <GuildPriority :navigationState="navigationState"/>
      <LanguagePriority :navigationState="navigationState"/>
    </template>
    <template #instruction>
      <p v-html="t('rules.action.influenceCard.instruction')"/>
    </template>
  </ActionBox>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import { CardAction } from '@/services/Card'
import ActionBox from '../ActionBox.vue'
import AppIcon from '@/components/structure/AppIcon.vue'
import GuildPriority from '@/components/structure/GuildPriority.vue'
import NavigationState from '@/util/NavigationState'
import LanguagePriority from '@/components/structure/LanguagePriority.vue'

export default defineComponent({
  name: 'ActionInfluenceCard',
  inheritAttrs: false,
  components: {
    ActionBox,
    AppIcon,
    GuildPriority,
    LanguagePriority
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
}
</style>
