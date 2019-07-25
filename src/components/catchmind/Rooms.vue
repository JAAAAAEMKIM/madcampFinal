<!-- ./src/components/Rooms.vue -->
<template>
  <div class="room-wrapper">
    <div class="card-carousel-wrapper">
      <div class="card-carousel--nav__left" @click="moveCarousel(-1)" :disabled="atHeadOfList"></div>
      <div class="card-carousel">
        <div class="card-carousel--overflow-container">

          <div class="card-carousel-cards" :style="{ transform: 'translateX' + '(' + currentOffset + 'px' + ')'}">
            <div class="card-carousel--card" v-for="(room, ind) in rooms"
              :key="ind"
              @click="joinRoom(room)"
              :class="(activeRoom.id === room.id) ? 'active_room' :''">
              <img  src = "../../assets/picasso1.jpg"/>
              <div class="card-carousel--card--footer">
                <p>{{ room.name }}</p>
              </div>
            </div>
          </div>

        </div>
      </div>
      <div class="card-carousel--nav__right" @click="moveCarousel(1)" :disabled="atEndOfList"></div>
    </div>
  </div>

</template>


<script>
  export default {
    name:'rooms',
    props: ['rooms'],
    template: "#v-carousel",
    data() {
      return {
        activeRoom: {},
        currentOffset: 0,
        windowSize: 4,
        paginationFactor: 1175,
      }
    },
    computed: {
      atEndOfList() {
        return this.currentOffset < (this.paginationFactor * -1) * (this.rooms.length/2 - this.windowSize);
      },
      atHeadOfList() {
        return this.currentOffset === 0;
      },
    },
    methods: {
      joinRoom(room) {
        this.activeRoom = room
        this.$emit('joinRoom', room)
      },
      moveCarousel(direction) {
        // Find a more elegant way to express the :style. consider using props to make it truly generic
        if (direction === 1 && !this.atEndOfList) {
          this.currentOffset -= this.paginationFactor;
        } else if (direction === -1 && !this.atHeadOfList) {
          this.currentOffset += this.paginationFactor;
        }
      },
    },
  }
</script>


<style scoped>
@font-face { font-family: 'S-CoreDream-3Light'; src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/S-CoreDream-3Light.woff') format('woff'); font-weight: normal; font-style: normal; }
@import url(//fonts.googleapis.com/earlyaccess/jejumyeongjo.css); .jejumyeongjo * { font-family: 'Jeju Myeongjo', serif; }
@font-face { font-family: 'NIXGONM-Vb'; src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/NIXGONM-Vb.woff') format('woff'); font-weight: normal; font-style: normal; }

.room-wrapper{
  margin-left: 1100px;
  margin-top: 60px;
}

.list-group-item {
  /* background: rgba(50, 100, 207, 0.9); */
  background-color: #03262f;
  border: 2px solid white;
  font: Helvetica;
  color: white;
}

.list-group:hover {
    cursor: pointer;
}

.list-group-item:hover {
  transform: scale(110%);
  opacity: 0.5;
  background: blue;
}

input[type=text] {

  border: 10px solid white;
  width: 80%;
  height: 50px;
  float:top;
}

html, body {
  font-family: Helvetica;
}

#app {
  font-family: Helvetica;
  font: Helvetica;
}
.card-carousel-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  margin:20px 0 40px;
  color: #666a73;
}

.card-carousel {
  display: flex;
  justify-content: left;
  width: 1180px;

}
.card-carousel--overflow-container {
  overflow: hidden;
  padding: 10px;
}
.card-carousel--nav__left, .card-carousel--nav__right {
  display: inline-block;
  width: 15px;
  height: 15px;
  padding: 10px;
  box-sizing: border-box;
  border-top: 4px solid #42b883;
  border-right: 4px solid #42b883;
  cursor: pointer;
  margin: 0 10px;
  transition: transform 150ms linear;
}
.card-carousel--nav__left[disabled], .card-carousel--nav__right[disabled] {
  opacity: 0.2;
  border-color: black;
}
.card-carousel--nav__left {
  transform: rotate(-135deg);
}
.card-carousel--nav__left:active {
  transform: rotate(-135deg) scale(0.9);
}
.card-carousel--nav__right {
  transform: rotate(45deg);
}
.card-carousel--nav__right:active {
  transform: rotate(45deg) scale(0.9);
}

.card-carousel-cards {
  display: flex;
  transition: transform 150ms ease-out;
  transform: translatex(0px);
  margin-top: 50px;
}
.card-carousel-cards .card-carousel--card {
  margin: 0 22px;
  cursor: pointer;
  height: 420px;
  box-shadow: 6px 6px 8px 3px rgba(60,60,60,0.5);
  background-color: #fff;
  border-radius: 4px;
  /* z-index: 3; */
  margin-bottom: 2px;
}
.card-carousel-cards .card-carousel--card:first-child {
  margin-left: 0;
}
.card-carousel-cards .card-carousel--card:last-child {
  margin-right: 0;
}
.card-carousel-cards .card-carousel--card img {
  vertical-align: bottom;
  width: 250px;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
  margin-bottom: 20px;
  transition: opacity 150ms linear;
  user-select: none;
}
.card-carousel-cards .card-carousel--card img:hover {
  opacity: 0.5;
  filter:blur(8px);
}
.card-carousel-cards .card-carousel--card--footer {
  border-top: 0;
  padding: 7px 15px;
}
.card-carousel-cards .card-carousel--card--footer p {
  padding: 3px 0;
  margin: 0;
  margin-bottom: 2px;
  font-family: 'NanumSquare', normal;
  font-size: 28px;
  font-weight: 500;
  text-align: center;
  color: #2c3e50;
  /*  */
  user-select: none;
  letter-spacing: 7px;
}
.card-carousel-cards .card-carousel--card--footer p:nth-of-type(2) {
  font-size: 12px;
  font-weight: 300;
  padding: 6px;
  margin-top: 6px;
  background: rgba(40, 44, 53, 0.06);
  display: inline-block;
  position: relative;
  margin-left: 4px;
  color: #666a73;
}
.card-carousel-cards .card-carousel--card--footer p:nth-of-type(2):before {
  content: "";
  float: left;
  position: absolute;
  top: 0;
  left: -12px;
  width: 0;
  height: 0;
  border-color: transparent rgba(40, 44, 53, 0.06) transparent transparent;
  border-style: solid;
  border-width: 12px 12px 12px 0;
}
.card-carousel-cards .card-carousel--card--footer p:nth-of-type(2):after {
  content: "";
  position: absolute;
  top: 10px;
  left: -1px;
  float: left;
  width: 4px;
  height: 4px;
  border-radius: 2px;
  background: white;
  box-shadow: -0px -0px 0px #004977;
}


h1 {
  font-size: 3.6em;
  font-weight: 100;
  text-align: center;
  margin-bottom: 0;
  color: #42b883;
}

.search {
  font-size: 18px;
  font-family: 'NIXGONM-Vb', normal;
  background: linear-gradient(to right, #000, #000) 0px calc(100%-1px)/calc(100% - 1px) 2px no-repeat;
}


</style>
