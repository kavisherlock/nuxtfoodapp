<template>
  <main class="item">
    <div class="container">
      <div class="image">
        <img :src="`/${currentItem.img}`" :alt="currentItem.item" />
      </div>
      <section class="itemDetails">
        <div class="title">
          <h1>{{ currentItem.item }}</h1>
          <p>{{ currentItem.description }}</p>
        </div>
        <div class="price">
          <h4>Price: {{ priceFormatting(currentItem.price) }}</h4>
        </div>
        <div>
          <label :for="quantity">
            <input
              type="number"
              name="quantity"
              id="quantity"
              :value="quantity"
              @change="quantity = Math.max($event.target.value, 1)"
            />
          </label>
          <button class="primary" @click="addToCart">Add To Cart - {{ priceFormatting(currentItem.price * quantity) }}</button>
        </div>
        <div v-if="currentItem.options && currentItem.options.length" class="options">
          <fieldset>
            <legend><h4>Choose a {{ currentItem.item }}</h4></legend>
            <div class="option" v-for="option in currentItem.options" :key="option">
              <input
                :id="option"
                type="radio"
                :name="currentItem.item + 'option'"
                :value="option"
                @change="selectedOption = $event.target.value"
              />
              <label class="label" :for="option">{{ option }}</label><br>
            </div>
          </fieldset>
        </div>
        <div v-if="currentItem.addOns && currentItem.addOns.length" class="options">
          <fieldset>
            <legend><h4>Choose any delicious Addons</h4></legend>
            <div class="option" v-for="addOn in currentItem.addOns" :key="addOn">
              <label class="c-custom-checkbox" :for="addOn">
                <input
                  :id="addOn"
                  type="checkbox"
                  :name="currentItem.item + 'addOn'"
                  :value="addOn"
                  @change="addOnChange"
                />
                <svg width="32" height="32" viewBox="-4 -4 39 39" aria-hidden="true" focusable="false">
                  <!-- The background -->
                  <rect class="cb-bg" width="35" height="35" x="-2" y="-2" stroke="currentColor" fill="none" stroke-width="3" rx="6" ry="6"></rect>
                  <!-- The checkmark-->
                  <polyline class="cb-cm" points="4,14 12,23 28,5" stroke="transparent" stroke-width="4" fill="none"></polyline>
                </svg>
                {{ addOn }}
              </label>
            </div>
          </fieldset>

          <AppToast v-if="showToast">
            Added to Cart<br/>
            Check out more <nuxt-link to="/restuarants">restuarants</nuxt-link><br/>
            Or go to <nuxt-link to="/cart">cart</nuxt-link> to submit order
          </AppToast>

          <AppToast v-if="showErrorToast" :showError="true">
            Please select an option
          </AppToast>
        </div>
      </section>
    </div>
  </main>
</template>

<script>
  import { mapState } from 'vuex';
  import AppSelect from '@/components/AppSelect.vue';
  import AppToast from '@/components/AppToast.vue';

  export default {
    components: {
      AppSelect,
      AppToast,
    },
    data() {
      return {
        id: this.$route.params.id,
        selectedOption: '',
        selectedAddOns: [],
        quantity: 1,
        showToast: false,
        showErrorToast: false,
      }
    },
    computed: {
      ...mapState(['fooddata']),
      currentItem() {
        let result;
        for (const restaurant of this.fooddata) {
          for (const item of restaurant.menu) {
            if (item.id === this.id) {
              result = item;
              break;
            }
          }
          if (result) break;
        }
        return result;
      }
    },
    methods: {
      priceFormatting(price) {
        return `$${price.toFixed(2)}`
      },
      addOnChange(event) {
        if (event.currentTarget.checked) {
          this.selectedAddOns.push(event.target.value);
        } else {
          this.selectedAddOns.splice(this.selectedAddOns.findIndex(el => el === event.target.value), 1);
        }
      },
      addToCart() {
        this.showErrorToast = false;
        this.showToast = false;
        if (this.currentItem.options && !this.selectedOption) {
          this.showErrorToast = true;
          setTimeout(() => {
            this.showErrorToast = false;
          }, 10000);
        } else {
          this.showToast = true;
          setTimeout(() => {
            this.showToast = false;
          }, 10000);
          this.$store.commit('addToCart', {
            quantity: this.quantity,
            selectedOption: this.selectedOption,
            selectedAddOns: this.selectedAddOns,
            item: this.currentItem.item,
            price: this.currentItem.price,
          });
        }
      },
    }
  }
</script>

<style lang="scss" scoped>
main.item {
  padding: 50px;
}

.image {
  margin: 20px 0;

  img {
    width: 100%;
  }
}

.title, .price {
  margin: 10px 0;
}

.title {
  margin-top: 0;
}

#quantity {
  padding: 5px 2px;
}

.option {
  padding: 5px;

  .label {
    padding-left: 5px;
  }
}

@media screen and (min-width: 600px) {
  main.item {
    padding: 50px 15%;
  }

  .container {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: 1fr;
    grid-column-gap: 0px;
    grid-row-gap: 0px;
  }

  .image { 
    grid-area: 1 / 1 / 2 / 2;
    margin: 0;
    margin-right: 20px;
  }
  
  section.itemDetails { grid-area: 1 / 2 / 2 / 3; }
}


label {
	cursor: pointer;

  --checked-state-bg-color: hsl(350, 95%, 58%);
  --checked-state-check-color: #fff;
  --outline-color: var(--checked-state-bg-color);
  --outline-offset: 2px;
}

.c-custom-checkbox {
  display: flex;
  align-items: flex-start;
}

// hide the checkbox accessibly
.c-custom-checkbox input[type="checkbox"] {
  /* remove the checkbox from the page flow, positioning it on top of the SVG */
  position: absolute;
  /* set same dimensions as the SVG */
  width: 1em;
  height: 1em;
  /* hide it */
  opacity: 0.00001;
}

// basic styles for the svg
.c-custom-checkbox svg {
  /* set SVG dimensions in ems; i.e. relative to the font size so that it scales with the size of the font. */
  width: 1em;
  height: 1em;
  
  margin-right: 0.5em;
  margin-top: .1em;

  /* apply a transition to the elements inside the svg */
  * {
    transition: all 0.1s linear;
  }
}

// style changes inside the svg when the checkbox is checked
.c-custom-checkbox input[type="checkbox"]:checked + svg {
  .cb-bg {
    fill: var(--checked-state-bg-color);
    stroke: var(--checked-state-bg-color);
  }

  .cb-cm {
    stroke: var(--checked-state-check-color);
  }
}

.c-custom-checkbox input[type="checkbox"]:focus + svg {
  outline: 3px solid var(--outline-color);
  outline-offset: var(--outline-offset);
}

/* WHCM styles */
.c-custom-checkbox svg {
  @media screen and (-ms-high-contrast: active) {
    rect {
      stroke: windowText;
    }
  }
}

@media screen and (-ms-high-contrast: active) {
  .c-custom-checkbox input[type="checkbox"]:checked ~ svg {
    rect {
      fill: windowText;
    }

    polyline {
      stroke: highlight;
    }
  }
}
</style>