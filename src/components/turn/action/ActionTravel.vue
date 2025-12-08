<template>
  <ActionBox :action="action" :instruction-title="t('rules.action.travel.title')" :navigationState="navigationState">
    <template #action>
      <div class="action">
        <AppIcon type="action" :name="action.action" class="icon"/>
      </div>
    </template>
    <template #priority>
      <LanguagePriority :navigationState="navigationState"/>
      <GuildPriority :navigationState="navigationState"/>
    </template>
    <template #instruction>
      <p v-html="t('rules.action.travel.deliverScroll')"/>
      <ul>
        <li v-html="t('rules.action.travel.languageFocus')"/>
        <li v-html="t('rules.action.travel.neutralMarkRelation')"/>
      </ul>
      <p v-html="t('rules.action.travel.placeCard')"/>
      <p v-if="action.travelInfluence?.length==2" v-html="t('rules.action.travel.influenceDependingOnRow')"/>
      <p v-else v-html="t('rules.action.travel.influenceTwo')"/>
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
import LanguagePriority from '@/components/structure/LanguagePriority.vue'
import GuildPriority from '@/components/structure/GuildPriority.vue'

export default defineComponent({
  name: 'ActionTravel',
  inheritAttrs: false,
  components: {
    ActionBox,
    AppIcon,
    LanguagePriority,
    GuildPriority
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
