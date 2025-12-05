<template>
  <div class="actionBox" :class="{'instruction': hasInstruction}" @click="showInstructions">
    <div class="actionWrapper">
      <div class="cost" v-if="action.requireEmployedTranslators">
        <AppIcon type="require" :name="`employed-translators-${action.requireEmployedTranslators}`" class="icon"/>
        <AppIcon name="arrow" class="arrow"/>
      </div>
      <div class="cost" v-if="action.requireScrollCardsHouseOfWisdom">
        <AppIcon type="require" :name="`scroll-cards-house-of-wisdom-${action.requireScrollCardsHouseOfWisdom}`" class="icon"/>
        <AppIcon name="arrow" class="arrow"/>
      </div>
      <slot name="action"></slot>
      <div class="bonus" v-if="action.silverBonus">
        <AppIcon v-for="index of action.silverBonus" :key="index" name="silver" extension="webp" class="icon silver"/>
      </div>
      <div class="bonus" v-if="action.influenceBonus">
        <AppIcon v-for="(guild,index) of action.influenceBonus" :key="index" type="guild" :name="guild" class="icon"/>
        <AppIcon name="multiple" class="multiple"/>
      </div>
      <div class="bonus" v-if="action.travelInfluence">
        <AppIcon type="travel-influence" :name="action.travelInfluence.join('-')" class="icon"/>
      </div>
      <div class="bonus" v-if="hasBodyOfBooksExpansion && action.pageCard">
        <AppIcon name="page-card" class="icon"/>
      </div>
      <div class="bonus" v-if="action.diceSumModifier">
        <AppIcon v-if="action.diceSumModifier > 0" type="dice-sum" name="add" class="icon"/>
        <AppIcon v-if="action.diceSumModifier < 0" type="dice-sum" name="subtract" class="icon"/>
      </div>
    </div>
    <div class="priority" v-if="hasPriority">
      <slot name="priority"></slot>
    </div>
  </div>

  <ModalDialog :id="modalId" :title="instructionTitle" :scrollable="true" :size-lg="modalSizeLg">
    <template #body>
      <p v-if="action.requireEmployedTranslators" v-html="t('rules.action.general.requireEmployedTranslators', {count:action.requireEmployedTranslators})"/>
      <p v-if="action.requireScrollCardsHouseOfWisdom" v-html="t('rules.action.general.requireScrollCardsHouseOfWisdom', {count:action.requireScrollCardsHouseOfWisdom})"/>
      <slot name="instruction"></slot>
      <p v-if="isInfluence1AnyBonus" v-html="t('rules.action.general.influence1AnyBonus')"/>
      <p v-else-if="action.influenceBonus" v-html="t('rules.action.general.influenceBonus')"/>
      <p v-if="action.silverBonus" v-html="t('rules.action.general.silverBonus')"/>
      <p v-if="hasBodyOfBooksExpansion && action.pageCard" v-html="t('rules.action.general.pageCard')"/>
      <p v-if="(action.diceSumModifier ?? 0) > 0" v-html="t('rules.action.general.diceSumAdd')"/>
      <p v-if="(action.diceSumModifier ?? 0) < 0" v-html="t('rules.action.general.diceSumSubtract')"/>
    </template>
  </ModalDialog>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import ModalDialog from '@brdgm/brdgm-commons/src/components/structure/ModalDialog.vue'
import showModal from '@brdgm/brdgm-commons/src/util/modal/showModal'
import AppIcon from '../structure/AppIcon.vue'
import { CardAction } from '@/services/Card'
import { nanoid } from 'nanoid'
import { useI18n } from 'vue-i18n'
import Guild from '@/services/enum/Guild'
import { useStateStore } from '@/store/state'
import Expansion from '@/services/enum/Expansion'

export default defineComponent({
  name: 'ActionBox',
  components: {
    ModalDialog,
    AppIcon
  },
  setup() {
    const { t } = useI18n()
    const state = useStateStore()
    const modalId = `modal-${nanoid()}`
    return { t, state, modalId }
  },
  props: {
    action: {
      type: Object as PropType<CardAction>,
      required: true
    },
    instructionTitle: {
      type: String,
      required: true
    },
    modalSizeLg: {
      type: Boolean,
      required: false
    }
  },
  computed: {
    hasPriority() : boolean {
      return this.$slots.priority !== undefined
    },
    hasInstruction() : boolean {
      return this.$slots.instruction !== undefined
    },
    isInfluence1AnyBonus() : boolean {
      return this.action.influenceBonus !== undefined && this.action.influenceBonus.length === 1 && this.action.influenceBonus[0] == Guild.ANY
    },
    hasBodyOfBooksExpansion() : boolean {
      return this.state.setup.expansions.includes(Expansion.BODY_OF_BOOKS)
    }
  },
  methods: {
    showInstructions() {
      if (this.hasInstruction) {
        showModal(this.modalId)
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.actionBox {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  background-color: #d7bea3;
  border: 2px solid #ba9673;
  border-radius: 0.5rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
  padding-left: 2rem;
  padding-right: 2rem;
  min-height: 7rem;
  &.instruction {
    cursor: pointer;
    background-image: url('@/assets/icons/help-semi-transparent.webp');
    background-repeat: no-repeat;
    background-position: right 5px top 5px;
    background-size: 1.25rem;
  }
  .actionWrapper {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 1rem;
  }
  .bonus, .cost {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.25rem;
    .icon {
      height: 2.75rem;
      &.silver {
        filter: drop-shadow(1px 0 0 white)
          drop-shadow(-1px 0 0 white)
          drop-shadow(0 1px 0 white)
          drop-shadow(0 -1px 0 white);
      }
    }
    .icon + .icon {
      margin-left: -1rem;
    }
    .multiple {
      height: 1.5rem;
      margin-top: 0.7rem;
      margin-left: -1.1rem;
    }
    .arrow {
      height: 1.5rem;
      margin-left: 0.5rem;
      margin-right: -0.25rem;
    }
  }
  .priority {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 1rem;
    gap: 0.5rem;
  }
}
</style>
