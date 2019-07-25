<template>
  <div class="container">
    <div class="d-flex justify-content-center">
      <color-picker v-bind="color" @input="onInput" @change="onChange"></color-picker>
    </div>

    <div class="slider-box d-flex justify-content-center">
      <div>
        <div class="d-flex">
          <input type="number" min="0" max="100" v-model="color.saturation" class="input">
          <input type="range" min="0" max="100" v-model="color.saturation" class="slider">
        </div>
        <br>
        <div class="d-flex">
          <input type="number" min="0" max="100" v-model="color.luminosity" class="input">
          <input type="range" min="0" max="100" v-model="color.luminosity" class="slider">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ColorPicker from '@radial-color-picker/vue-color-picker'

export default {
    components: { ColorPicker },
    data() {
        return {
            color: {
                hue: 0,          // 0~359
                saturation: 100, // 0~100
                luminosity: 50,  // 0~100
                alpha: 1
            },
        }
    },
    methods: {
        onInput(hue) {
            this.color.hue = hue
        },
        onChange(hue){
          this.$emit("color", this.color)
        }
    },
}
</script>
<style scoped>

.input{
  width: 50px;
  height: 25px;
  margin-right: 10px;
  text-align:center;
    border-radius: 6px;
      border: 0px;
}

.slider-box{
  margin-top: 2rem;

}
.slider {
    -webkit-appearance: none;  /* Override default CSS styles */
    appearance: none;
    height: 25px; /* Specified height */
    width: 255px;
    background: white; /* Grey background */
    border-radius: 6px;
    outline: none; /* Remove outline */
    opacity: 0.7; /* Set transparency (for mouse-over effects on hover) */
    -webkit-transition: .2s; /* 0.2 seconds transition on hover */
    transition: opacity .2s;
}

.slider:hover {
    opacity: 1; /* Fully shown on mouse-over */
}
.slider::-webkit-slider-thumb {
    -webkit-appearance: none; /* Override default look */
    appearance: none;
    width: 25px; /* Set a specific slider handle width */
    height: 25px; /* Slider handle height */
    background: #303b46; /* Green background */
    cursor: pointer; /* Cursor on hover */
    border-radius: 6px;
}

.slider::-moz-range-thumb {
    width: 25px; /* Set a specific slider handle width */
    height: 25px; /* Slider handle height */
    background: #303b46; /* Green background */
    cursor: pointer; /* Cursor on hover */
}

</style>
