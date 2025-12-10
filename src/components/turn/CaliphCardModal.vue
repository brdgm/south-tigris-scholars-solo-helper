<template>
  <ModalDialog id="caliphCardModal" :size-lg="true" :scrollable="true" :title="t('rules.caliphCard.title')">
    <template #body>
      <p>{{ t('rules.caliphCard.guildControl') }}</p>

      <div class="caliphOption">
        <div class="preference">{{optionPreference[0]}}</div>
        <div class="form-check">
          <label class="form-check-label">
            <input class="form-check-input" type="checkbox" v-model="caliphCard3VP" :value="true">
            <AppIcon type="vp" name="3" class="icon"/>
          </label>
        </div>
      </div>
      <div class="caliphOption">
        <div class="preference">{{optionPreference[1]}}</div>
        <div class="form-check">
          <label class="form-check-label">
            <input class="form-check-input" type="checkbox" v-model="caliphCard1VPAddDice" :value="true">
            <AppIcon type="vp" name="1" class="icon"/>
            <AppIcon name="add-any-dice" class="icon"/>
          </label>
        </div>
      </div>
      <div class="caliphOption">
        <div class="preference">{{optionPreference[2]}}</div>
        <div class="form-check">
          <label class="form-check-label">
            <input class="form-check-input" type="checkbox" v-model="caliphCardRetireTranslator" :value="true">
            <AppIcon name="retire-translator-gain-dice" class="icon"/> / <AppIcon name="gold" class="icon gold"/>
          </label>
        </div>
      </div>

      <p class="mt-3">{{ t('rules.caliphCard.consolation') }}</p>

      <div class="caliphOption">
        <div><AppIcon name="consolation" class="icon"/></div>
        <div class="form-check">
          <label class="form-check-label">
            <input class="form-check-input" type="checkbox" v-model="consolationWorker" :value="true">
            <AppIcon name="worker-any" class="icon worker"/>
          </label>
        </div>
      </div>
      <div class="caliphOption">
        <div><AppIcon name="consolation" class="icon"/></div>
        <div class="form-check">
          <label class="form-check-label">
            <input class="form-check-input" type="checkbox" v-model="consolationSilver" :value="true">
            <AppIcon name="silver" extension="webp" class="icon"/>
          </label>
        </div>
      </div>
      <div class="caliphOption">
        <div><AppIcon name="consolation" class="icon"/></div>
        <div class="form-check">
          <label class="form-check-label">
            <input class="form-check-input" type="checkbox" v-model="consolationGold" :value="true">
            <AppIcon name="gold" class="icon gold"/>
          </label>
        </div>
      </div>
    </template>
    <template #footer>
      <button class="btn btn-outline-danger me-auto" data-bs-dismiss="modal" @click="removeAllCaliphCard()">{{t('rules.caliphCard.remove')}}</button>
      <button class="btn btn-primary" data-bs-dismiss="modal" @click="applyCaliphCard()">{{t('rules.caliphCard.apply')}}</button>
      <button class="btn btn-secondary" data-bs-dismiss="modal">{{t('action.close')}}</button>
    </template>
  </ModalDialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import ModalDialog from '@brdgm/brdgm-commons/src/components/structure/ModalDialog.vue'
import NavigationState from '@/util/NavigationState'
import SchemeCardColor from '@/services/enum/SchemeCardColor'
import AppIcon from '../structure/AppIcon.vue'
import { CardAction } from '@/services/Card'
import Action from '@/services/enum/Action'

export default defineComponent({
  name: 'CaliphCardModal',
  emits: {
    caliphActions: (_actions: CardAction[]) => true,  // eslint-disable-line @typescript-eslint/no-unused-vars
    caliphOptionsRemove: () => true
  },
  components: {
    ModalDialog,
    AppIcon
  },
  setup() {
    const { t } = useI18n()
    return { t }
  },
  data() {
    return {
      caliphCard3VP: false,
      caliphCard1VPAddDice: false,
      caliphCardRetireTranslator: false,
      consolationWorker: false,
      consolationSilver: false,
      consolationGold: false
    }
  },
  props: {
    navigationState: {
      type: NavigationState,
      required: true
    }
  },
  computed: {
    optionPreference() : number[] {
      if (this.navigationState.botActions?.colorMajority == SchemeCardColor.BLUE) {
        return [1,2,3]
      }
      else {
        return [3,2,1]
      }
    }
  },
  methods: {
    applyCaliphCard() {
      const actions : CardAction[] = []
      if (this.consolationGold) {
        actions.push({ action: Action.TRANSLATOR_PLACE_GOLD })
      }
      if (this.consolationWorker || this.consolationSilver) {
        const silverBonus = (this.consolationWorker ? 1 : 0) + (this.consolationSilver ? 1 : 0)
        if (actions.length == 0) {
          actions.push({ action: Action.SILVER, silverBonus })
        }
        else {
          actions[0].silverBonus = silverBonus
        }
      }
      if (this.caliphCard1VPAddDice) {
        const diceSumModifier = 1
        if (actions.length == 0) {
          actions.push({ action: Action.SILVER, diceSumModifier })
        }
        else {
          actions[0].diceSumModifier = diceSumModifier
        }
      }
      if (this.caliphCardRetireTranslator) {
        actions.push({ action: Action.TRANSLATOR_RETIRE, diceSumModifier: -1 })
      }
      this.$emit('caliphActions', actions)

      this.caliphCard3VP = false
      this.caliphCard1VPAddDice = false
      this.caliphCardRetireTranslator = false
      this.consolationWorker = false
      this.consolationSilver = false
      this.consolationGold = false
    },
    removeAllCaliphCard() {
      this.$emit('caliphOptionsRemove')
    }
  }
})
</script>

<style lang="scss" scoped>
.caliphOption {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0.25rem;
  gap: 0.5rem;
  .preference {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 2rem;
    height: 2rem;
    background-color: darkred;
    color: white;
    border-radius: 50%;
  }
  > *:first-child {
    width: 2rem;
    margin-right: 0.5rem;
  }
  .form-check-label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
}
.icon {
  height: 2rem;
  &.worker {
    height: 3rem;
    margin: -0.25rem;
  }
  &.gold {
    height: 3rem;
    margin: -0.5rem;
  }
}
</style>
