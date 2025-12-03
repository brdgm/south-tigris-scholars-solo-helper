<template>
  <div class="tableWrapper">
    <table>
      <tbody>
        <tr>
          <th scope="col">
            <h5>{{t('gameEnd.botCards.title')}}</h5>
          </th>
          <th scope="col">
            <span class="fw-bold">{{t('gameEnd.botCards.count')}}</span>
          </th>
          <th scope="col">
            <span class="fw-bold">{{t('gameEnd.botCards.cards')}}</span>
          </th>
          <th scope="col">
            <span class="fw-bold">{{t('gameEnd.botCards.vp')}}</span>
          </th>
        </tr>
        <tr>
          <th scope="row">
          </th>
          <td></td>
          <td>
            <AppIcon type="translator" name="0" extension="webp" class="translator"/>
            <NumberInput v-model="botChineseScrollCount"/>
          </td>
          <td>
            {{botChineseScrollVP}}
          </td>
        </tr>
        <tr>
          <th scope="row">
            <span v-if="hasBodyOfBooksExpansion" v-html="t('gameEnd.botCards.retiredTranslatorBodyOfBooks')"></span>
            <span v-else v-html="t('gameEnd.botCards.retiredTranslator')"></span>
          </th>
          <td>
            <NumberInput v-model="botRetiredTranslatorCount"/>
          </td>
          <td>
            <AppIcon type="translator" name="1" extension="webp" class="translator"/>
            <NumberInput v-model="botSanskritScrollCount"/>
          </td>
          <td>
            {{botSanskritScrollVP}}
          </td>
        </tr>
        <tr>
          <th scope="row">
            <span v-html="t('gameEnd.botCards.translatedScrollCard')"></span>
          </th>
          <td>
            {{botTranslatedScrollCardCount}}
          </td>
          <td>
            <AppIcon type="translator" name="2" extension="webp" class="translator"/>
            <NumberInput v-model="botGreekScrollCount"/>
          </td>
          <td>
            {{botGreekScrollVP}}
          </td>
        </tr>
        <tr>
          <th scope="row">
            <span v-html="t('gameEnd.botCards.remainingResearchMarker')"></span>
          </th>
          <td>
            {{botRemainingResearchMarkerCount}}
          </td>
          <td>
            <AppIcon type="translator" name="3" extension="webp" class="translator"/>
            <NumberInput v-model="botHebrewScrollCount"/>
          </td>
          <td>
            {{botHebrewScrollVP}}
          </td>
        </tr>
        <tr>
          <th scope="row">
            <span v-html="t('gameEnd.botCards.employedNeutralTranslator')"></span>
          </th>
          <td>
            <NumberInput v-model="botEmployedNeutralTranslatorCount"/>
          </td>
          <td>
            <AppIcon type="translator" name="4" extension="webp" class="translator"/>
            <NumberInput v-model="botPersianScrollCount"/>
          </td>
          <td>
            {{botPersianScrollVP}}
          </td>
        </tr>
        <tr>
          <th scope="row">
            <span v-html="t('gameEnd.botCards.influence')"></span>
          </th>
          <td>
            <NumberInput v-model="botInfluenceCount"/>
          </td>
          <td>
            <AppIcon type="translator" name="5" extension="webp" class="translator"/>
            <NumberInput v-model="botSyriacScrollCount"/>
          </td>
          <td>
            {{botSyriacScrollVP}}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="tableWrapper mt-3">
    <table>
      <tbody>
        <tr>
          <th scope="col">
            <h5>{{t('gameEnd.scoring.title')}}</h5>
          </th>
          <th scope="col">
            <span class="fw-bold">{{t('turnPlayer.title')}}</span>
          </th>
          <th scope="col">
            <span class="fw-bold">{{t('turnBot.title')}}</span>
          </th>
        </tr>
        <tr>
          <th scope="row">
            <span v-html="t('gameEnd.scoring.diceSum')"></span>
          </th>
          <td>
            <NumberInput v-model="playerDiceSumVP"/>
          </td>
          <td>
            <NumberInput v-model="botDiceSumVP"/>
          </td>
        </tr>
        <tr>
          <th scope="row">
            <span v-if="hasBodyOfBooksExpansion" v-html="t('gameEnd.scoring.retiredTranslatorsBodyOfBooks')"></span>
            <span v-else v-html="t('gameEnd.scoring.retiredTranslators')"></span>
          </th>
          <td>
            <NumberInput v-model="playerRetiredTranslatorsPageCardVP"/>
          </td>
          <td>
            <NumberInput v-model="botRetiredTranslatorsPageCardVP"/>
          </td>
        </tr>
        <tr>
          <th scope="row">
            <span v-html="t('gameEnd.scoring.guildMajorities')"></span>
          </th>
          <td>
            <NumberInput v-model="playerGuildMajoritiesVP"/>
          </td>
          <td>
            <NumberInput v-model="botGuildMajoritiesVP"/>
          </td>
        </tr>
        <tr>
          <th scope="row">
            <span v-html="t('gameEnd.scoring.caliphCards')"></span>
          </th>
          <td>
            <NumberInput v-model="playerCaliphCardsVP"/>
          </td>
          <td>
            <NumberInput v-model="botCaliphCardsVP"/>
          </td>
        </tr>
        <tr>
          <th scope="row">
            <span v-html="t('gameEnd.scoring.researchMarkers')"></span>
          </th>
          <td>
            <NumberInput v-model="playerResearchMarkersVP"/>
          </td>
          <td>
          </td>
        </tr>
        <tr>
          <th scope="row">
            <span v-html="t('gameEnd.scoring.scrollCards')"></span>
          </th>
          <td>
            <NumberInput v-model="playerScrollCardsVP"/>
          </td>
          <td>
            {{botTotalScrollCardsVP}}
          </td>
        </tr>
        <tr v-if="hasBodyOfBooksExpansion">
          <th scope="row">
            <span v-html="t('gameEnd.scoring.rowBonusTiles')"></span>
          </th>
          <td>
            <NumberInput v-model="playerRowBonusTilesVP"/>
          </td>
          <td>
          </td>
        </tr>
        <tr>
          <th scope="row" class="fw-bold">
            {{t('gameEnd.scoring.totalVP')}}
          </th>
          <td class="fw-bold">
            {{playerTotalVP}}
          </td>
          <td class="fw-bold">
            {{botTotalVP}}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { useStateStore } from '@/store/state'
import { defineComponent, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import NumberInput from '@brdgm/brdgm-commons/src/components/form/NumberInput.vue'
import NavigationState from '@/util/NavigationState'
import { useRoute } from 'vue-router'
import toNumber from '@brdgm/brdgm-commons/src/util/form/toNumber'
import Expansion from '@/services/enum/Expansion'
import AppIcon from '../structure/AppIcon.vue'

export default defineComponent({
  name: 'FinalScoring',
  components: {
    NumberInput,
    AppIcon
  },
  setup() {
    const { t } = useI18n()
    const route = useRoute()
    const state = useStateStore()

    const navigationState = new NavigationState(route, state)

    const playerDiceSumVP = ref(undefined as number|undefined)
    const playerRetiredTranslatorsPageCardVP = ref(undefined as number|undefined)
    const playerGuildMajoritiesVP = ref(undefined as number|undefined)
    const playerCaliphCardsVP = ref(undefined as number|undefined)
    const playerResearchMarkersVP = ref(undefined as number|undefined)
    const playerScrollCardsVP = ref(undefined as number|undefined)
    const playerRowBonusTilesVP = ref(undefined as number|undefined)

    const botDiceSumVP = ref(undefined as number|undefined)
    const botRetiredTranslatorsPageCardVP = ref(undefined as number|undefined)
    const botGuildMajoritiesVP = ref(undefined as number|undefined)
    const botCaliphCardsVP = ref(undefined as number|undefined)

    const botChineseScrollCount = ref(undefined as number|undefined)
    const botSanskritScrollCount = ref(undefined as number|undefined)
    const botRetiredTranslatorCount = ref(undefined as number|undefined)
    const botGreekScrollCount = ref(undefined as number|undefined)
    const botHebrewScrollCount = ref(undefined as number|undefined)
    const botPersianScrollCount = ref(undefined as number|undefined)
    const botEmployedNeutralTranslatorCount = ref(undefined as number|undefined)
    const botSyriacScrollCount = ref(undefined as number|undefined)
    const botInfluenceCount = ref(undefined as number|undefined)

    return { t, state, navigationState, 
      playerDiceSumVP,
      playerRetiredTranslatorsPageCardVP,
      playerGuildMajoritiesVP,
      playerCaliphCardsVP,
      playerResearchMarkersVP,
      playerScrollCardsVP,
      playerRowBonusTilesVP,
      botDiceSumVP,
      botRetiredTranslatorsPageCardVP,
      botGuildMajoritiesVP,
      botCaliphCardsVP,
      botChineseScrollCount,
      botSanskritScrollCount,
      botRetiredTranslatorCount,
      botGreekScrollCount,
      botHebrewScrollCount,
      botPersianScrollCount,
      botEmployedNeutralTranslatorCount,
      botSyriacScrollCount,
      botInfluenceCount
    }
  },
  data() {
    return {
      coins: [] as number[]
    }
  },
  computed: {
    botTranslatedScrollCardCount() : number {
      return toNumber(this.botChineseScrollCount)
        + toNumber(this.botSanskritScrollCount)
        + toNumber(this.botGreekScrollCount)
        + toNumber(this.botHebrewScrollCount)
        + toNumber(this.botPersianScrollCount)
        + toNumber(this.botSyriacScrollCount)
    },
    botChineseScrollVP () : number {
      return toNumber(this.botChineseScrollCount) * 7
    },
    botSanskritScrollVP () : number {
      return toNumber(this.botSanskritScrollCount) * Math.floor(toNumber(this.botRetiredTranslatorCount) / 2)
    },
    botGreekScrollVP () : number {
      return toNumber(this.botGreekScrollCount) * this.botTranslatedScrollCardCount
    },
    botRemainingResearchMarkerCount() : number {
      const count = 6 - this.navigationState.botResources.resourceTrackBenefitsClaimed
      return Math.max(0, count)
    },
    botHebrewScrollVP () : number {
      return toNumber(this.botHebrewScrollCount) * this.botRemainingResearchMarkerCount
    },
    botPersianScrollVP () : number {
      return toNumber(this.botPersianScrollCount) * toNumber(this.botEmployedNeutralTranslatorCount)
    },
    botSyriacScrollVP () : number {
      return toNumber(this.botSyriacScrollCount) * Math.floor(toNumber(this.botInfluenceCount) / 2)
    },
    botTotalScrollCardsVP(): number {
      return this.botChineseScrollVP
        + this.botSanskritScrollVP
        + this.botGreekScrollVP
        + this.botHebrewScrollVP
        + this.botPersianScrollVP
        + this.botSyriacScrollVP
    },
    playerTotalVP(): number {
      return toNumber(this.playerDiceSumVP)
        + toNumber(this.playerRetiredTranslatorsPageCardVP)
        + toNumber(this.playerGuildMajoritiesVP)
        + toNumber(this.playerCaliphCardsVP)
        + toNumber(this.playerResearchMarkersVP)
        + toNumber(this.playerScrollCardsVP)
        + toNumber(this.playerRowBonusTilesVP)
    },
    botTotalVP(): number {
      return toNumber(this.botDiceSumVP)
        + toNumber(this.botRetiredTranslatorsPageCardVP)
        + toNumber(this.botGuildMajoritiesVP)
        + toNumber(this.botCaliphCardsVP)
        + this.botTotalScrollCardsVP
    },
    hasBodyOfBooksExpansion(): boolean {
      return this.state.setup.expansions.includes(Expansion.BODY_OF_BOOKS)
    }
  }
})
</script>

<style lang="scss" scoped>
.tableWrapper {
  overflow-x: auto;
}
th, td {
  text-align: center;
  padding: 0.5rem;
  font-weight: normal;
  min-width: 5rem;
}
th:nth-child(1) {
  text-align: start;
}
tr:nth-child(even) {
  background-color: #f2f2f2;
}
th {
  vertical-align: middle;
}
input {
  width: 5rem;
}
.translator {
  height: 2rem;
  margin-right: 0.5rem;
  margin-top: -0.3rem;
  filter: drop-shadow(1px 0 0 white)
    drop-shadow(-1px 0 0 white)
    drop-shadow(0 1px 0 white)
    drop-shadow(0 -1px 0 white);
}
</style>
