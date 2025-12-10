<template>
  <div class="translators">
    <AppIcon v-for="translator of translators" :key="translator" type="translator" :name="`${translator}`" extension="webp" class="translator"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NavigationState from '@/util/NavigationState'
import AppIcon from './AppIcon.vue'
import getTranslator from '@/util/getTranslator'

export default defineComponent({
  name: 'TranslatorPriority',
  components: {
    AppIcon
  },
  props: {
    navigationState: {
      type: NavigationState,
      required: true
    }
  },
  computed: {
    translators() : number[] {
      return getTranslator(this.navigationState.botResources.resourceTrack)
    }
  }
})
</script>

<style lang="scss" scoped>
.translators {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 0.25rem;
}
.translator {
  height: 2.2rem;
  filter: drop-shadow(1px 0 0 white)
    drop-shadow(-1px 0 0 white)
    drop-shadow(0 1px 0 white)
    drop-shadow(0 -1px 0 white);
}
</style>
