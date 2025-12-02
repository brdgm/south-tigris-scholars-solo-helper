<template>
  <div class="guilds">
    <AppIcon v-for="guild of guilds" :key="guild" type="guild" :name="guild" class="guild"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NavigationState from '@/util/NavigationState'
import getResourceTrackGuild from '@/util/getResourceTrackGuild'
import Guild from '@/services/enum/Guild'
import AppIcon from './AppIcon.vue'

export default defineComponent({
  name: 'GuildPriority',
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
    guilds() : Guild[] {
      return getResourceTrackGuild(this.navigationState.botResources.resourceTrack)
    }
  }
})
</script>

<style lang="scss" scoped>
.guilds {
  display: flex;
  flex-direction: row;
  gap: 1rem;
}
.guild {
  height: 2rem;
}
</style>
