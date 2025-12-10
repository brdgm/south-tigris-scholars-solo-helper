<template>
  <ActionBox :action="action" :instruction-title="t('rules.action.translate.title')" :modalSizeLg="true" :guildPriority="true" :navigationState="navigationState">
    <template #action>
      <div class="action">
        <AppIcon type="action" :name="action.action" class="icon"/>
        <AppIcon name="translation-place-gold" class="icon translationPlaceGold"/>
      </div>
    </template>
    <template #priority>
      <LanguagePriority :navigationState="navigationState"/>
    </template>
    <template #instruction>
      <p v-html="t('rules.action.translate.translate')"/>
      <ul>
        <li v-html="t('rules.action.translate.languageFocus')"/>
        <li v-html="t('rules.action.translate.lowestRow')"/>
        <li v-html="t('rules.action.translate.guildFocus')"/>
      </ul>
      <AppIcon name="translation-place-gold" class="icon translationPlaceGold float-end"/>
      <p v-html="t('rules.action.translate.placeCard')"/>
      <p v-html="t('rules.action.translate.placeGold.title')"/>
      <ul>
        <li v-html="t('rules.action.translate.placeGold.neutralTranslatorsLanguage')"/>
        <li v-html="t('rules.action.translate.placeGold.translatorsLanguage')"/>
        <li v-html="t('rules.action.translate.placeGold.neutralTranslators')"/>
        <li v-html="t('rules.action.translate.placeGold.translators')"/>
      </ul>
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

export default defineComponent({
  name: 'ActionTranslate',
  inheritAttrs: false,
  components: {
    ActionBox,
    AppIcon,
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
  &.translationPlaceGold {
    height: 4rem;
    margin: -1rem;
    margin-bottom: -1.5rem;
  }
}
.modal {
  .icon.translationPlaceGold {
    height: 4rem;
    margin: -0.5rem;
    filter: drop-shadow(2px 2px 2px #888);
  }
}
</style>
