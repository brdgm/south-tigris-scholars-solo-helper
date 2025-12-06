<template>
  <h1>{{t('setupBot.title')}}</h1>

  <div class="instructions mt-4">
    <p v-html="t('setupBot.instructions.intro')"></p>
    <ol>
      <li v-html="t('setupBot.instructions.soloBoard')"></li>
      <li v-if="settings.influenceOrangeGuild" v-html="t('setupBot.instructions.influenceOrangeGuild', {count:settings.influenceOrangeGuild})"></li>
      <li v-if="settings.influencePurpleGuildScrollCard" v-html="t('setupBot.instructions.influencePurpleGuildScrollCard', {count:settings.influencePurpleGuildScrollCard})"></li>
      <li v-if="settings.influenceScrollCardNeutralMarker" v-html="t('setupBot.instructions.influenceScrollCardNeutralMarker', {count:settings.influenceScrollCardNeutralMarker})"></li>
      <li v-if="settings.goldOnLeftMostTranslatorCount" v-html="t('setupBot.instructions.goldOnLeftMostTranslatorCount', {count:settings.goldOnLeftMostTranslatorCount})"></li>
      <li v-if="settings.startingScrollCard" v-html="t('setupBot.instructions.startingScrollCard', {language:t('language.' + settings.startingScrollCard)})"></li>
      <li v-if="hasBodyOfBooksExpansion" v-html="t('setupBot.instructions.researchMarkersBodyOfBooks')"></li>
      <li v-else v-html="t('setupBot.instructions.researchMarkers')"></li>
      <li v-html="t('setupBot.instructions.firstPlayerMarker')"></li>
      <li v-if="hasBodyOfBooksExpansion" v-html="t('setupBot.instructions.xpFirstCaliphSpace')"></li>
      <li v-html="t('setupBot.instructions.noFurtherSetup')"></li>
    </ol>
    <p v-html="t('setupBot.instructions.noSchemeCards')"></p>
  </div>

  <div class="container-fluid mt-4">
    <div class="row">
      <div class="col alert alert-primary">
        <h4>{{t('setupBot.ruleChanges.title')}}</h4>
        <ul>
          <li v-html="t('setupBot.ruleChanges.neutralTranslators')"></li>
          <li v-html="t('setupBot.ruleChanges.retireNeutralTranslators')"></li>
          <li v-html="t('setupBot.ruleChanges.scrollCardIcons')"></li>
          <li v-html="t('setupBot.ruleChanges.influenceCard.title')"></li>
          <ul>
            <li v-html="t('setupBot.ruleChanges.influenceCard.letThem')"></li>
            <li v-html="t('setupBot.ruleChanges.influenceCard.denyThem')"></li>
          </ul>
          <li v-if="hasBodyOfBooksExpansion" v-html="t('setupBot.ruleChanges.upgradedActionCards')"></li>
        </ul>
      </div>
    </div>
  </div>

  <button class="btn btn-primary btn-lg mt-4" @click="startGame()">
    {{t('action.startGame')}}
  </button>

  <FooterButtons backButtonRouteTo="/setup" endGameButtonType="abortGame"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useStateStore } from '@/store/state'
import FooterButtons from '@/components/structure/FooterButtons.vue'
import { useRouter } from 'vue-router'
import getDifficultyLevelSettings, { DifficultyLevelSettings } from '@/util/getDifficultyLevelSettings'
import Expansion from '@/services/enum/Expansion'
import CardDeck from '@/services/CardDeck'

export default defineComponent({
  name: 'SetupBot',
  components: {
    FooterButtons
  },
  setup() {
    const { t } = useI18n()
    const state = useStateStore()
    const router = useRouter()

    return { t, state, router }
  },
  computed: {
    settings() : DifficultyLevelSettings {
      return getDifficultyLevelSettings(this.state.setup.difficultyLevel)
    },
    hasBodyOfBooksExpansion() : boolean {
      return this.state.setup.expansions.includes(Expansion.BODY_OF_BOOKS)
    }
  },
  methods: {
    startGame() : void {
      this.state.resetGame()
      this.state.setup.initialCardDeck = CardDeck.new().toPersistence()
      this.router.push('/turn/1/player')
    }
  }
})
</script>

<style lang="scss" scoped>
.instructions {
  max-width: 1000px;
  ol > li {
    margin-top: 0.5rem;
  }
}
</style>
