<template>
  <div class="rooms">
    <div v-for="room of rooms" :key="room" class="room">
      <AppIcon name="silver" extension="webp" class="icon"/>
      <div class="number">{{room}}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import NavigationState from '@/util/NavigationState'
import AppIcon from './AppIcon.vue'
import getTranslatorRoom from '@/util/getTranslatorRoom'

export default defineComponent({
  name: 'TranslatorRoomPriority',
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
    rooms() : number[] {
      return getTranslatorRoom(this.navigationState.botActions?.silverValueSum ?? this.navigationState.cardDeck.silverValueSum)
    }
  }
})
</script>

<style lang="scss" scoped>
.rooms {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 1rem;
}
.room {
  position: relative;
  .icon {
    height: 1.75rem;
    filter: drop-shadow(1px 0 0 white)
      drop-shadow(-1px 0 0 white)
      drop-shadow(0 1px 0 white)
      drop-shadow(0 -1px 0 white);
  }
  .number {
    position: absolute;
    font-size: 1.5rem;
    top: 47.5%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #fff;
  }
}
</style>
