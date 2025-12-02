<template>
  <div class="languages">
    <div v-for="language of languages" :key="language" class="language">{{t(`language.${language}`) }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NavigationState from '@/util/NavigationState'
import getResourceTrackLanguage from '@/util/getResourceTrackLanguage'
import Language from '@/services/enum/Language'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'LanguagePriority',
  setup() {
    const { t } = useI18n()
    return { t }
  },
  props: {
    navigationState: {
      type: NavigationState,
      required: true
    }
  },
  computed: {
    languages() : Language[] {
      return getResourceTrackLanguage(this.navigationState.botResources.resourceTrack)
    }
  }
})
</script>

<style lang="scss" scoped>
.languages {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 0.1rem;
}
.language {
  text-transform: uppercase;
  font-size: 0.75rem;
  background: linear-gradient(0deg, #666 0%, #222 100%);
  border: 1px solid #fff;
  color: #fff;
  padding: 0.2rem;
}
</style>
