<template>
<div id="exhibition">
  <div>
    <nav class="navbar navbar-inverse navbar-fixed-top">

      <div class="navbar-inner">
        <button class="navbar-toggler" type="button" @click="gohome" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
            <img src="../../assets/logo.png" width="40" height="40" alt="">
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
      <li class="nav-link" id='about' @click="goAbout">About</li>
    </nav>
  </div>

  <div class="container">
      <h1> EXHIBITION </h1>
      <br><br>
      <div v-if="isloading" class="spinner-border text-info" role="status" >
        <span class="sr-only">Loading...</span>
      </div>
      <div v-else>
        <v-gallery :images="image_list" class="image-box">
          <a href="javascript:void(0);"
              :data-image="img.url"
              :title="img.title"
              v-for="img in image_list" >
              <div class="bgbox">
                <img :src="img.url">
              </div>
              <div class="img-title" v-html="img.title"></div>
              <div class="img-name"> {{ img.name }} </div>
          </a>
        </v-gallery>
      </div>
    </div>
  </div>
</div>
</template>

<script>

const resourceHost = 'http://143.248.39.49:4500'

export default {
  name: 'exhibition-main',
  created(){
    this.fetchImages()
  },
  data(){
    return {
      isloading: false,
      image_list:[]
    }
  },
  methods:{
    fetchImages(){
      this.isloading = true
      this.$axios.get(`${resourceHost}/exhibition/get_images`)
        .then(({data}) => {
          console.log(data)
          data.forEach( (image) =>{
            this.image_list.push({title: image.roomname, name: image.name, url: resourceHost+'/'+image.url})
          })
          this.isloading = false
        })
    },
    gohome(){
      this.$router.push({name:'HelloWorld'})
    },
    goAbout() {
      this.$router.push({name:'About'})
    },
    goExhibition(){
      this.$router.push({name:'Exhibition'})
    }
  }
}
</script>

<style lang="scss" scoped>
@font-face { font-family: 'Binggrae-Bold'; src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_one@1.0/Binggrae-Bold.woff') format('woff'); font-weight: normal; font-style: normal; }
@font-face { font-family: 'NotoSerifKR'; src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_two@1.0/NotoSerifKR.woff') format('woff'); font-weight: normal; font-style: normal; }

@font-face { font-family: 'NIXGONM-Vb'; src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/NIXGONM-Vb.woff') format('woff'); font-weight: normal; font-style: normal; }

#exhibition {
  background-image: url('../../assets/cardboard-1920x1080.png');
  height: 100vh;
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
h1{
    font-family: 'NotoSerifKR', normal;
    font-size: 60px;
    /* color: lightgray; */
    color: #4c0064;
}
h5 {
  font-size: 1.5vw;
  color: #03262f;
  font-family: 'Binggrae-Bold',normal;
}

.image-box{
        a {
            width: 20%;
            clear: both;
            display: inline-block;
            margin: 0 10px 10px 0;
            position: relative;
            text-align: center;
            .bgbox {
                background-color: #232323;
                height: 150px;
                display:table-cell;
                vertical-align:middle;
                padding: 4px;
                border-radius: 2px;
                img{ max-width: 100%; display: block;}
            }
            .img-title {
                bottom: 5px;
                display: block;
                text-align: center;
                color: #373030;
                padding-top: 5px;
                font-family:"NanumSquare";
                font-size: 18px;
            }
            .img-name{
              font-family:"NanumSquare";
            }
            &:hover {
                .img-title { color: #232323; }
            }
        }
    }
</style>
