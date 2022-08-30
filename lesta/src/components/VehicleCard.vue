<template>
  <v-card :class="$style.VehicleCard">
    <v-img
      min-height="250"
      max-height="250"
      contain
      :src="vehicle.icons.large"
    />
    <v-card-title>{{ vehicle.title }}</v-card-title>
    <v-card-text>
      <div class="mb-3">
        <div :class="$style.specContainer">
          <v-img max-width="30" contain :src="vehicle.type.icons.default" />
          <span>{{ vehicle.type.title }}</span>
        </div>
      </div>
      <div>{{ vehicle.description }}</div>
    </v-card-text>
    <div :class="$style.specs">
      <v-img max-height="80" contain :src="vehicle.nation.icons.small" />
      <span :class="$style.level">{{ vehicle.level }}</span>
    </div>
  </v-card>
</template>

<script lang="ts">
import { PropType } from 'vue'
import Vehicle from '@/types/Vehicle'

export default {
  name: 'VehicleCard',

  props: {
    vehicle: {
      type: Object as PropType<Vehicle>,
      required: true,
    },
  },
}
</script>

<style lang="scss" module>
.VehicleCard {
  min-height: 250px;
  width: 100%;
}

.specContainer {
  display: flex;
  align-items: center;
}

.specs {
  position: absolute;
  top: 16px;
  left: 16px;
  display: flex;
  flex-direction: column;
}

.level {
  font-size: 80px;
  opacity: 0.5;
}
</style>
