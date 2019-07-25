<template>
  <div id="paint" class="row">
    <div class="col-4 ui">
      <div class="d-flex flex-column">
        <h2> UI </h2>
        <h5> Pen </h5>
        <div class="buttons">
          <div class="btn btn-outline-primary" @click="brush">Brush</div>
          <div class="btn btn-outline-primary" @click="erase">Eraser</div>
        </div>
        <br>
        <h5> Width </h5>
        <div class="d-flex justify-content-center">
          <input type="number" min="1" max="40" v-model="width" class="input">
          <input type="range" min="1" max="40" v-model="width" class="slider">
        </div>
        <br>
        <h5> Color </h5>
        <ColorPicker @color="change_color"> </ColorPicker>
      </div>
      <br><br>
      <!-- <div class="btn btn-outline-primary" @click="reset">Reset</div> -->
    </div>
    <div class="col-8">
      <div style="float:none; margin:0 auto">
        <h2> Paint </h2>
        <canvas id="canvas" v-canvas="{username : username, channel: channel, color : color, width : width,
                                        painting : paintings, isErasing : isErasing}">
        </canvas>
      </div>
    </div>
  </div>
</template>

<script>
  import canvas from './canvas.directive.js' //bound our directive to canvas element
  import ColorPicker from './ColorPicker.vue'


  export default {
    name: 'paint-draw',
    props: ['channel','paintings'],
    components: { ColorPicker },
    data() {
      return {
        username: this.$route.params.username,
        isErasing: false,
        color: 'black',
        width: 10
      }
    },
    // Here we register our custom directive
    directives: {
      canvas
    },
    methods: {
      change_color(color){
        this.color=`hsl(${color.hue}, ${color.saturation}%, ${color.luminosity}% )`
      },
      erase(){
         this.isErasing = true
      },
      brush(){
        this.isErasing = false
      },
      reset(){ //// TODO: 푸셔랑 연동해야함
        const canvas = document.getElementById('canvas')
        const context = canvas.getContext('2d')
        context.clearRect(0,0,canvas.width, canvas.height)
    }
  }
}
</script>

<style scoped>
canvas {
background: white;
border:2px solid;
border-radius:4px;
border-color:black;
}
h5 {
margin-bottom: 10px;
}

.ui{
  padding-top: 1%;
}

.input{
  text-align:center;
    border-radius: 6px;
      border: 0px;
  width: 50px;
  height: 25px;
  margin-right: 10px;


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
    outline: none; /* Remove outline */
    opacity: 0.7; /* Set transparency (for mouse-over effects on hover) */
    -webkit-transition: .2s; /* 0.2 seconds transition on hover */
    transition: opacity .2s;
        border-radius: 6px;
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
