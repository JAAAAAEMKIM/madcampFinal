<template>
  <div id="about">


    <div class="fullpage-container">
      <div>
        <nav class="navbar navbar-inverse navbar-fixed-top">
          <div class="navbar-inner">
            <button class="navbar-toggler" type="button" @click="gohome" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
                <img src="../assets/logo.png" width="30" height="30" alt="">
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
            <li class="nav-link" id='ex' @click='goExhibition()'>Exhibition</li>
          </div>
        </nav>
      </div>
          <h4 data-v-1e46e7ac="" class="home__title"> ,Pablo</h4>
      <div class="fullpage-wp" v-fullpage="opts" ref="example">
        <div class="page-1 page" id="page-1">
          <!-- <img src='../../assets/gone2.jpg'/> -->
          <div class="d-flex justify-content-center">
            <div class="img_container">
              <h1>About Picasso</h1>
              <br><br>
              <img id="picasso" src='../assets/picasso.jpg'/>
            </div>
              <div class="part-1" v-animate="{value: 'bounceInLeft'}">
                <p>Pablo Ruiz Picasso (UK: /ˈpæbloʊ pɪˈkæsoʊ/, US: /ˈpɑːbloʊ pɪˈkɑːsoʊ, -ˈkæs-/,[2][3][4] Spanish: [ˈpaβlo piˈkaso]; 25 October 1881 – 8 April 1973) was a Spanish painter, sculptor, printmaker, ceramicist, stage designer, poet and playwright who spent most of his adult life in France. </p>
                <p> Regarded as one of the most influential artists of the 20th century, he is known for co-founding the Cubist movement, the invention of constructed sculpture,[5][6] the co-invention of collage, and for the wide variety of styles that he helped develop and explore. </p>
                <p> Among his most famous works are the proto-Cubist Les Demoiselles d'Avignon (1907), and Guernica (1937), a dramatic portrayal of the bombing of Guernica by the German and Italian airforces during the Spanish Civil War.</p>
                <br>
                <p>Picasso demonstrated extraordinary artistic talent in his early years, painting in a naturalistic manner through his childhood and adolescence.</p>
                <p> During the first decade of the 20th century, his style changed as he experimented with different theories, techniques, and ideas. After 1906, the Fauvist work of the slightly older artist Henri Matisse motivated Picasso to explore more radical styles, beginning a fruitful rivalry between the two artists, who subsequently were often paired by critics as the leaders of modern art.[7][8][9][10]</p>
                <br>
                <p>Picasso's work is often categorized into periods.</p>
                <p> While the names of many of his later periods are debated, the most commonly accepted periods in his work are the Blue Period (1901–1904), the Rose Period (1904–1906), the African-influenced Period (1907–1909), Analytic Cubism (1909–1912), and Synthetic Cubism (1912–1919), also referred to as the Crystal period.</p>
                <p> Much of Picasso's work of the late 1910s and early 1920s is in a neoclassical style, and his work in the mid-1920s often has characteristics of Surrealism. His later work often combines elements of his earlier styles.</p>
                <br>
                <p>Exceptionally prolific throughout the course of his long life, Picasso achieved universal renown and immense fortune for his revolutionary artistic accomplishments, and became one of the best-known figures in 20th-century art.</p>
              </div>
          </div>
        </div>
        <div class="page-2 page" id="page-2">
          <div class="part-2" v-animate="{value: 'bounceInRight'}">
            <h1>HOW TO</h1>
            <div class="d-flex justify-content-center">
              <div class="card">
                <img src='../assets/contract.png' width="200px" height="200px"/>
                <div class="card-carousel--card--footer">
                  <br>
                  <h3>SIGN IN</h3>
                </div>
                <br>
                <div class="text">
                  먼저 원하는 아이디를 이용하여 회원가입 후 로그인 하세요.
                </div>
              </div>
              <div class="card">
                <img src='../assets/signin.png' width="200px" height="200px"/>
                <div class="card-carousel--card--footer">
                  <br>
                  <h3>JOIN ROOM</h3>
                </div>
                <br>
                <div class="text">
                   원하는 방에 들어가거나, 새로운 방을 만들어 보세요.
                </div>
              </div>
              <div class="card">
                <img src='../assets/artist.png' width="200px" height="200px"/>
                <div class="card-carousel--card--footer">
                  <br>
                  <h3>PAINT YOURS</h3>
                </div>
                <br>
                <div class="text">
                   색과 굵기를 선택한 후, 원하는 그림을 마음껏 그리세요.
                </div>
              </div>
              <div class="card">
                <img src='../assets/canvas.png' width="200px" height="200px"/>
                <div class="card-carousel--card--footer">
                  <br>
                  <h3>EXHIBITION</h3>
                </div>
                <br>
                <div class="text">
                  완성된 그림은 전시할 수도 있습니다. 자신의 그림을 전시하고, 다른 사람들의 그림도 감상해 보세요.
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="page-3 page" id="page-3">
          <div class="d-flex justify-content-center">
            <div id="jaem" class="d-flex justify-content-left">
              <!-- <div class="jaem"> -->
                <h1>KimJaemin</h1><br><br>
                <img id="min" src='../assets/me.jpg' height="600px"/>
                <ul>고려대학교 환경생태공학부 14학번 재학</ul>
              <!-- </div> -->
            </div>
            <div id="min"class="d-flex justify-content-center">
              <!-- <div class="min"> -->
                <h1>MinDongchan</h1><br><br>
                <img id="min" src='../assets/min.png' height="600px"/>
                <ul>KAIST 전자과 13학번 재학</ul>
              <!-- </div> -->
            </div>
          </div>
        </div>

        <div class="page-4 page" id="page-4">

          <img src='../assets/gone4.png' id="gone" width="1440px" height="876px"/>
          <div class="specialthanks">
            <br>
            <h1 id="special" placeholder=""> Special Thanks To</h1>

            <ul>
              <br><br>
              <p>FRONT END CTO GONE LEE</p><br><br>
              <li>1999.01.15 출생</li>
              <li>영등포 거주</li>
              <li>2017.03 고려대학교 컴퓨터학과 입학</li>
              <li>컴퓨터학과 사물놀이패 장구러</li>
              <li>웹개발 단체 멋쟁이사자처럼 에이스</li>
              <li>2019.06 몰입캠프 수석 웹디자이너</li>
          </ul>
            <!-- <p class="part-3" v-animate="{value: 'bounceInLeft', delay: 0}">fullpage-vue</p>
            <p class="part-3" v-animate="{value: 'bounceInRight', delay: 600}">fullpage-vue</p>
            <p class="part-3" v-animate="{value: 'zoomInDown', delay: 1200}">fullpage-vue</p> -->
          </div>
        </div>


      <!-- <button @click="moveNext">next</button> -->
    </div>
  </div>
</div>
</template>

<script>
  export default {
    data() {
      return {
        opts: {
          start: 0,
          dir: 'v',
          duration: 500,
          beforeChange: function (currentSlideEl,currenIndex,nextIndex) {
          },
          afterChange: function (currentSlideEl,currenIndex,nextIndex) {
          }
        }
      }
    },
    methods:{
      moveNext(){
        this.$refs.example.$fullpage.moveNext() //Move to the next page
      },
      gohome(){
        this.$router.push({name:'HelloWorld'})
      },
      goExhibition() {
        this.$router.push({name:'Exhibition'})
      }
    }
  }

</script>

<style scoped>
@font-face { font-family: 'Binggrae-Bold'; src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_one@1.0/Binggrae-Bold.woff') format('woff'); font-weight: normal; font-style: normal; }

@font-face { font-family: 'NIXGONM-Vb'; src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/NIXGONM-Vb.woff') format('woff'); font-weight: normal; font-style: normal; }
@font-face { font-family: 'NotoSerifKR'; src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_two@1.0/NotoSerifKR.woff') format('woff'); font-weight: normal; font-style: normal; }

.navbar.transparent.navbar-inverse .navbar-inner {
   border-width: 0px;
   -webkit-box-shadow: 0px 0px;
   box-shadow: 0px 0px;
   background-color: rgba(0,0,0,0.0);
   /* background-image: -webkit-gradient(linear, 50.00% 0.00%, 50.00% 100.00%, color-stop( 0% , rgba(0,0,0,0.00)),color-stop( 100% , rgba(0,0,0,0.00))); */
   background-image: -webkit-linear-gradient(270deg,rgba(0,0,0,0.00) 0%,rgba(0,0,0,0.00) 100%);
   background-image: linear-gradient(180deg,rgba(0,0,0,0.00) 0%,rgba(0,0,0,0.00) 100%);
}

#jaem, #min{
   flex-direction:column;
   margin-left: 50px;
   margin-right: 50px;
}

#ex:hover {
  cursor: pointer;
}

.nav-link {
  color: lightGray;
}

#about:hover {
  cursor: pointer;
}

#id {
  background:#FFFFFF;
}
#special {
  text-align: left;
}
#gone{
  position: absolute;
  margin-left: -500px;
  margin-top: 30px;
}
ul {
  font-family: 'NanumSquare';
  color: ivory;
  text-align: left;
  font-size: 24px;
}

.specialthanks {
  margin:80px;
}

#page-1 {
  padding: 40px;
}

/* .home-title {
} */

.card {
  height: 500px;
  padding: 30px;
  margin: 70px;
  border: 8px solid orange;
  border-radius: 20px;
  font-family: 'NIXGONM-Vb',normal;
  box-shadow: 6px 6px 8px 3px rgba(0,0,0,0.5);
}
.card-carousel--card--footer {
  font-family: 'NIXGONM-Vb',normal;

}

.text {
  width: 200px;
  text-align:left;
  font-family: 'NanumSquare';
  font-style: bold;
  font-size:18px;
}

h5 {
  font-size: 1.5vw;
  color: ivory;
  font-family: 'Binggrae-Bold',normal;
  /* transform: rotate(-7deg) translateX(-12vw) translateY(35vh);
  font-weight: 700;
  letter-spacing: -53px; */
}

h4 {
    font-size: 700px;
    font-size: 40vw;
    color: #03262f;
    text-shadow: 0 0 2px gray;
    font-family: 'Binggrae-Bold',normal;

      position: absolute;
    -webkit-transform: rotate(-7deg) translateX(-12vw) translateY(35vh);
    transform: rotate(-12deg) translateX(-15vw) translateY(34vh);
    font-weight: 700;
    letter-spacing: -53px;
}

h1{
    font-family: 'NotoSerifKR', normal;
    font-size: 60px;
    /* color: lightgray; */
    color: ivory;
}

p {
  float: left;
  text-align: left;
  font-family: 'NotoSerifKR', normal;
}
.part-1 {
  /* padding-left:  */
  margin-left: 200px;
  float:right;
  color: lightgray;
  /* color: ivory; */
  width:40%;
}
#picasso {
  align:center;
}

.img-container {
  width:600px;
  height:600px;
  /* position: absolute; */
}

.page {
    /* background:#00FF00; */
    /* background-image:url('../../assets/gone2.jpg'); */
  }

.fullpage-container {
  height: 100%;
  background: #03262f;
  /* background-image:url('../assets/gone2.jpg'); */
}

  .page-container {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}



</style>
