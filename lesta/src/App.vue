<template>
  <v-app>
    <v-main :class="$style.wrapper">
      <transition-group name="fade">
        <v-skeleton-loader
          v-if="loading"
          key="loader"
          type="article@2, card@3"
          class="mb-6"
        />
        <v-container key="content">
          <v-row>
            <v-col cols="12" md="4">
              <v-select
                v-model="selected.nations"
                :items="nations"
                item-text="title"
                item-value="name"
                multiple
                clearable
                placeholder="Nation"
              />
            </v-col>
            <v-col cols="12" md="4">
              <v-select
                v-model="selected.types"
                :items="types"
                item-text="title"
                item-value="name"
                multiple
                clearable
                placeholder="Type"
              />
            </v-col>
            <v-col cols="12" md="4" align-self="center">
              <v-range-slider
                :value="selected.level"
                :min="extremeLevels.min || 1"
                :max="extremeLevels.max || 11"
                thumb-label="always"
                label="Level"
                hide-details
                dense
                @change="onLevelSliderChange"
              />
            </v-col>
          </v-row>
          <template v-if="currentPageVehicles.length">
            <transition-group name="fade">
              <v-row
                v-for="item in currentPageVehicles"
                :key="item.title"
                class="mb-6"
              >
                <VehicleCard :vehicle="item" />
              </v-row>
            </transition-group>
          </template>
          <v-pagination v-model="page" :length="pageCount" />
        </v-container>
      </transition-group>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'
import VehicleCard from '@/components/VehicleCard.vue'
import Vehicle from '@/types/Vehicle'

interface Select {
  nations: string[]
  types: string[]
  level: number[]
}

export default Vue.extend({
  name: 'App',

  components: {
    VehicleCard,
  },

  data: () => ({
    selected: {
      nations: [],
      types: [],
      level: [],
    } as Select,
    page: 1,
    limit: 15,
  }),

  computed: {
    ...mapState(['loading']),
    ...mapState('vehicle', ['nations', 'types', 'vehicles']),
    ...mapGetters('vehicle', ['extremeLevels']),

    filteredVehicles(): Vehicle[] {
      return this.vehicles.filter((item: Vehicle) => {
        let result = true
        const nation: string = item.nation.name
        const type: string = item.type.name

        if (
          this.selected.nations.length &&
          !this.selected.nations.includes(nation)
        ) {
          result = false
        }
        if (this.selected.types.length && !this.selected.types.includes(type)) {
          result = false
        }
        if (
          this.selected.level.length &&
          (this.selected.level[0] > item.level ||
            this.selected.level[1] < item.level)
        ) {
          result = false
        }

        return result
      })
    },

    currentPageVehicles(): Vehicle[] {
      const startIndex = (this.page - 1) * this.limit
      const lastIndex = startIndex + this.limit
      return this.filteredVehicles.slice(startIndex, lastIndex)
    },

    pageCount(): number {
      return Math.ceil(this.filteredVehicles.length / this.limit)
    },
  },

  async mounted() {
    this.setLoading(true)

    await Promise.all([
      this.delayPromise(),
      this.fetchVehicles(),
      this.fetchTypes(),
      this.fetchNations(),
    ])

    this.$set(this.selected, 'level', [
      this.extremeLevels.min,
      this.extremeLevels.max,
    ])

    this.setLoading(false)
  },

  methods: {
    ...mapMutations(['setLoading']),
    ...mapActions('vehicle', ['fetchVehicles', 'fetchNations', 'fetchTypes']),

    delayPromise(delay = 2000): Promise<void> {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve()
        }, delay)
      })
    },

    onLevelSliderChange(val: number[]) {
      console.log(val)
      this.$set(this.selected, 'level', val)
    },
  },
})
</script>

<style lang="scss" module>
.wrapper {
  width: 100%;
  max-width: 900px;
  margin: 100px auto;
}
</style>
