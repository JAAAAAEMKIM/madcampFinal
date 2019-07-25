<template>
  <div class="hello" id = 'hello'>
    <div>
      <nav class="navbar navbar-inverse navbar-fixed-top">

        <div class="navbar-inner">
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
              <img src="../assets/logo.png" width="40" height="40" alt="">
              <h5 class="navbar-brand">Picasso</h5>
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
            <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
              <li class="nav-item active">
                <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Link</a>
              </li>
              <li class="nav-item">
                <a class="nav-link disabled" href="#" tabindex="-1" aria-disabled="true">Disabled</a>
              </li>
            </ul>
            <form class="form-inline my-2 my-lg-0">
              <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
              <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>
          </div>
        </div>
        <div>
          <li class="nav-link" id='about' @click='goAbout()'>About</li>
          <li class="nav-link" id='ex' @click="goExhibition">Exhibition</li>
        </div>
      </nav>
    </div>

    <h4 data-v-1e46e7ac="" class="home__title"> ,Pablo</h4>

    <div id="wrap" class="wrapper">

      <div id="Stack" class="box">
         <div class="card" alt="card0" id="draq">
           <div id="flip-card-box" class="flip-card-inner" @click="cardFlip()">
             <div id="flip-card-front" class="flip-card-front">
               <img src="../assets/draq.png" alt="Avatar" style="width:450px;height:600px;" >
             </div>
             <div class="flip-card-back">
                 <sign-in></sign-in>
             </div>
           </div>
         </div>

        <transition name="animate" leave-active-class="animated fadeOutDown">
          <div class="card" alt="card1" v-on:mousewheel="animated1= false" v-if="animated1" v-on:click="animated1=false, animated2=false, animated3=false, animated4=false">
          </div>
        </transition>

        <transition name="animate" leave-active-class="animated fadeOutDown">
          <div class="card" alt="card2" v-on:mousewheel="animated2= false" v-if="animated2" v-on:click="animated1=false, animated2=false, animated3=false, animated4=false">
          </div>
        </transition>

        <transition name="animate" leave-active-class="animated fadeOutDown">
          <div class="card" alt="card3" v-on:mousewheel="animated3= false" v-if="animated3" v-on:click="animated1=false, animated2=false, animated3=false, animated4=false">
          </div>
        </transition>

        <transition name="animate" leave-active-class="animated fadeOutDown">
          <div class="card" alt="card4" v-on:mousewheel="animated4= false" v-if="animated4" v-on:click="animated1=false, animated2=false, animated3=false, animated4=false">
          </div>
        </transition>
      </div>
    </div>
  </div>

</template>

<script>
import SignIn from './signin/SignIn';

export default {
  name: 'HelloWorld',
  components: {
    'sign-in': SignIn
  },
  data () {
    return {
      msg: 'PICASSO',
      animated1: true,
      animated2: true,
      animated3: true,
      animated4: true
    }
  },
  methods: {
      imageClick() {
        this.$router.push('/main2')
      },
      cardFlip() {
          document.getElementById('flip-card-box').classList.add('rotate')
          document.getElementById('flip-card-front').style['display'] = 'none'
      },
      goAbout() {
        this.$router.push({name:'About'})
      },
      goExhibition() {
        this.$router.push({name:'Exhibition'})
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

@font-face { font-family: 'Binggrae-Bold'; src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_one@1.0/Binggrae-Bold.woff') format('woff'); font-weight: normal; font-style: normal; }

#ex:hover {
  cursor: pointer;
}

#hello {
  background-image: url('../assets/cardboard-1920x1080.png');
  height : 100vh;
  width : 100vw;
}

.navbar.transparent.navbar-inverse .navbar-inner {
   border-width: 0px;
   -webkit-box-shadow: 0px 0px;
   box-shadow: 0px 0px;
   background-color: rgba(0,0,0,0.0);
   /* background-image: -webkit-gradient(linear, 50.00% 0.00%, 50.00% 100.00%, color-stop( 0% , rgba(0,0,0,0.00)),color-stop( 100% , rgba(0,0,0,0.00))); */
   background-image: -webkit-linear-gradient(270deg,rgba(0,0,0,0.00) 0%,rgba(0,0,0,0.00) 100%);
   background-image: linear-gradient(180deg,rgba(0,0,0,0.00) 0%,rgba(0,0,0,0.00) 100%);
}

h4 {
    font-size: 700px;
    font-size: 40vw;
    color: #03262f;
    font-family: 'Binggrae-Bold',normal;
    -webkit-transform: rotate(-7deg) translateX(-12vw) translateY(35vh);
    transform: rotate(-12deg) translateX(-15vw) translateY(34vh);
    font-weight: 700;
    letter-spacing: -53px;
}

h5 {
  font-size: 1.5vw;
  color: #03262f;
  font-family: 'Binggrae-Bold',normal;
}

h1 {
  font-weight: normal;
  font-size: 64px;
}

h2 {
  font-weight: normal;
}
h3 {
  font-size:14px;
}

ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
  top:100px
}
a {
  color: #42b983;
}

img {
  position: relative; bottom:0px; left:0px;
}

#about:hover {
  cursor: pointer;
}

.box {
  position: absolute;
  top:50%;
  left:50%;
  transform: translate(-50%, -50%);
  width: 450px;
  height: 600px;
}
.box .card{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  box-shadow: 0 0px 0px rgba(0,0,0,0);
  /* background: url(../assets/logo.png); */
  transition: 0.5s;
  transform-origin: middle;
  border-radius: 0px;
  /* animation: animate 1s linear infinite; */
}
.box .card:nth-child(1){
  background: url(../assets/draq.png);
  transform: translate(0px, 0px) scale(10%);
    transform: rotate(0deg)
}
.box .card:nth-child(2){
  background: url(../assets/source1.jpg);
  transform: translate(2px, 2px);
    transform: rotate(-3deg)
}
.box .card:nth-child(3){
  background: url(../assets/source2.png);
  transform: translate(0px, 0px);
  transform: rotate(2deg)
}

.box .card:nth-child(4){
  background: url(../assets/source3.png);
  transform: translate(-2px, -2px);
  transform: rotate(-2deg)
}
.box .card:nth-child(5){
  background: url(../assets/source4.png);
  transform: translate(0px, 0px);
}


.box .card:before{
  position:absolute;
  color: #fff;

}

.box:hover .card:nth-child(5){
  transform: rotate(-2deg) translate(0px,0px);
}
.box:hover .card:nth-child(2){
  transform: rotate(-8deg) translate(0px,0px);
}
.box:hover .card:nth-child(3){
  transform: rotate(8deg) translate(0px,0px);
}
.box:hover .card:nth-child(4){
  transform: rotate(3deg) translate(0px,0px);
}

.box:hover .card{
  z-index: 0;
  box-shadow: 0 0px 0px rgba(0,0,0, 0);
}


.flip-card {
  background-color: transparent;
  /* width: 450px;
  height: 600px; */
  width: 100%;
  height: 100%;
  perspective: 1000px;
}

.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
}

.rotate{
    transform: rotateY(180deg);
}

.flip-card:hover .flip-card-inner {
  transform: rotateY(180deg);
}

.flip-card-front, .flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
}

.flip-card-front {
  background-color: #bbb;
  color: black;
  cursor: pointer;
}

.flip-card-back {
  background-color: white;
  color: black;
  transform: rotateY(180deg);
}



</style>
