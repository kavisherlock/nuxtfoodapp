<template>
  <main class="restaurants">
    <div class="restauranthead">
      <h1>Resturants</h1>
      <AppSelect @change="selectedRestaurant = $event" />
    </div>

    <AppRestaurantInfo :restaurants="filteredRestaurants" />
  </main>
</template>

<script>
import AppRestaurantInfo from '@/components/AppRestaurantInfo.vue';
import AppSelect from '@/components/AppSelect.vue';
import { mapState } from 'vuex';

export default {
  components: {
    AppRestaurantInfo,
    AppSelect,
  },
  data() {
    return {
      selectedRestaurant: ''
    }
  },
  
  computed: {
    ...mapState(['fooddata']),
    filteredRestaurants() {
      if (this.selectedRestaurant) {
        return this.fooddata.filter(r => r.name.toLowerCase().includes(this.selectedRestaurant));
      }

      return this.fooddata;
    }
  }
};
</script>