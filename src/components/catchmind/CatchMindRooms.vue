<template>
  <div id = "cama">

    <!-- Naviagation Bar -->
    <div>
      <nav class="navbar navbar-inverse navbar-fixed-top">
        <div class="navbar-inner">
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
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
        <div>
          <li class="nav-link" id='about' @click='goAbout()'>About</li>
          <li class="nav-link" id='ex' @click='goExhibition()'>Exhibition</li>
        </div>
      </nav>
    </div>

    <h4 data-v-1e46e7ac="" class="home__title"> ,Pablo</h4>

    <div class="wrapper">
     <form class="roomform" @submit.prevent="createRoom()">
       <div class="d-flex" id="makeroom">
         <div class="d-flex" id="profile">

           <h1>User Profile</h1>
                      <br>
           <p>ID  : {{currentUserId}} </p>
           <p>Name: {{currentUserName}} </p>
           <p>E-mail: {{currentUserEmail}} </p>
         </div>

         <div class="create">
           <h3>Create</h3>
           <input type="text" class= "newroom" v-model="roomname" placeholder=" 방 이름 입력" />
           <input type="submit" class="btn btn-outline-dark" value="Create"/>
         </div>
         <div class="search">
           <h3>Search</h3>
           <input type="text" placeholder=" Search..." class="input-search">
           <input type="submit" class="btn btn-outline-dark" value="Go"/>
         </div>
       </div>


       <div id="loading" v-if="isloading" class="spinner-border text-info" role="status" >
         <span class="sr-only">Loading...</span>
       </div>
       <div v-else>
         <Rooms @joinRoom="subscribeToRoom" :rooms="rooms">
         </Rooms>
       </div>

     </form>
    </div>

  </div>
</template>

<script>
import { ChatManager, TokenProvider } from '@pusher/chatkit-client'

import Rooms from './Rooms.vue'

const resourceHost = 'https://143.248.39.49:4500'


export default{
  name: 'catch-mind',
  components: {
    Rooms
  },
  data(){
    return{
      isloading: false,
      chatManager: null,

      currentUser: null,
      currentUserId: '',
      currentUserName: '',
      currentUserEmail: '',

      rooms: [],
      activeRoom: null,
      roomname: ''

    }
  },
  created(){
    this.getUserProfile(this.$route.params.username)
    this.setupChatKit(this.$route.params.username)
  },
  watch: {
    // 라우트가 변경되면 메소드를 다시 호출됩니다.
    '$route.params.username': function(username){
      this.getUserProfile(username)
      this.setupChatKit(username)
    }
  },
  methods: {
    goAbout() {
      this.$router.push({name:'About'})
    },
    goExhibition() {
      this.$router.push({name:'Exhibition'})
    },
    getUserProfile(username){
      var swal = this.$swal
      this.$axios.get(`${resourceHost}/users/${username}`)
        .then(({data}) => {
          console.log("유저 정보 받아보자!!!!!!!")
          console.log(data)
          if (data.success){
            this.currentUserId = data.data.username
            console.log(this.currentUserId)
            this.currentUserName = data.data.name
            console.log(this.currentUserName)
            if(data.data.email){
              this.currentUserEmail = data.data.email
            } else{
              this.currentUserEmail = '이메일을 등록하세요'
            }
          } else {
            swal.fire({
             title: 'Login Required!',
             text: "다시 로그인 하세요.",
             type: 'warning'
            })
            this.$router.push({name: 'HelloWorld'})
          }
        })
        .catch(err =>{
          swal.fire({
           title: 'Network Error',
           text: "네트워크 오류입니다.",
           type: 'warning'
          })
          this.$router.push({name: 'HelloWorld'})
        })
    },
    setupChatKit(username) {
      this.isloading = true;
      // Initialise the token provider
      const tokenProvider = new TokenProvider({
       //process.env.VUE_APP_CHATKIT_TOKEN_ENDPOINT
       url: 'https://us1.pusherplatform.io/services/chatkit_token_provider/v1/8520b1c5-60ce-4395-9162-9412b2882565/token'
      });

      // Initialise the chatkit manager
      const chatManager = new ChatManager({
       // process.env.VUE_APP_CHATKIT_INSTANCE_LOCATOR
       instanceLocator: 'v1:us1:8520b1c5-60ce-4395-9162-9412b2882565',
       userId: username,
       tokenProvider: tokenProvider
      });

      chatManager
       .connect()
       .then( currentUser => {
         this.currentUser = currentUser
         // Fetch rooms
         console.log("방목록 받아용~~~~")
         this.$axios.get(`${resourceHost}/catchmind/get_rooms`)
           .then(data => {
             this.rooms = data.data.data
             this.isloading = false;
             console.log("rooms:"+this.rooms)
           })
       })
       .catch( error => {
         console.error("chatmanager connection error: ", error)
       });
     },
     subscribeToRoom(room) {
        this.activeRoom = room
        var path_ = '/catchmind/'+this.currentUser.id+'/paint/'+this.activeRoom.name
        this.$router.push({name: 'CatchMindPaint'
          , params: {username : this.currentUser.name, roomName:this.activeRoom.name,  activeRoom : this.activeRoom , currentUser : this.currentUser}})

    },
    addMessage(message) {
        this.currentUser.sendSimpleMessage({
                roomId: this.activeRoom.id,
                text: message,
          })
    },
    createRoom(){
        if(this.roomname.trim() === '') return

        this.currentUser.createRoom({
          name: this.roomname,
          private: false})
          .then(room => {
            console.log('create room successfully')
            this.rooms.push(room)
            this.subscribeToRoom(room)
          })
          .catch(err => {
            console.error('create room error:', error)
          })
    },
    gohome() {
      this.$router.push({name:'HelloWorld'});
    },
    goExhibition(){
      this.$router.push({name:'Exhibition'})
    }

  }
}

</script>

<style scoped>
@font-face { font-family: 'Binggrae-Bold'; src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_one@1.0/Binggrae-Bold.woff') format('woff'); font-weight: normal; font-style: normal; }
@font-face { font-family: 'NotoSerifKR'; src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_two@1.0/NotoSerifKR.woff') format('woff'); font-weight: normal; font-style: normal; }

@font-face { font-family: 'NIXGONM-Vb'; src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/NIXGONM-Vb.woff') format('woff'); font-weight: normal; font-style: normal; }

.navbar.transparent.navbar-inverse .navbar-inner {
   border-width: 0px;
   -webkit-box-shadow: 0px 0px;
   box-shadow: 0px 0px;
   background-color: rgba(0,0,0,0.0);
   /* background-image: -webkit-gradient(linear, 50.00% 0.00%, 50.00% 100.00%, color-stop( 0% , rgba(0,0,0,0.00)),color-stop( 100% , rgba(0,0,0,0.00))); */
   background-image: -webkit-linear-gradient(270deg,rgba(0,0,0,0.00) 0%,rgba(0,0,0,0.00) 100%);
   background-image: linear-gradient(180deg,rgba(0,0,0,0.00) 0%,rgba(0,0,0,0.00) 100%);
}

.profile {
  font-family:"NanumSquare"
}

#ex:hover {
  cursor: pointer;
}

p{
  font-family:"NanumSquare";
  padding-left: 15px;
  text-align: left;
  font-size:18px;
}
h4 {
    /* text-shadow: 0 0 1px black; */
    font-size: 700px;
    font-size: 45vw;
    /* color: #03262f; */
    font-family: 'Binggrae-Bold',normal;

    /* -webkit-transform: rotate(-7deg) translateX(-12vw) translateY(35vh); */
    transform: rotate(-12deg) translateX(-15vw) translateY(34vh);
    font-weight: 100;
    color: #03262f;
    letter-spacing: -53px;
}

/* .home__title{
  z-index: 1;
} */

h5 {
  font-size: 1.5vw;
  color: #03262f;
  font-family: 'Binggrae-Bold',normal;

}


h3 {
  margin-top: 20px;
  size:10px;
  font-size:24px;
  font-family: "NanumSquare", normal;
  text-align: center;
  letter-spacing: 2px;
}

h1 {
  margin-top: 20px;
  size:10px;
  font-size: 24px;
  font-family: 'Binggrae-Bold', normal;
  /* font-family: 'Binggrae-Bold',normal; */
}



#cama {
  background-image: url('../../assets/cardboard-1920x1080.png');
  height: 100vh;
}


input[type='text'] {
  border:none;
  margin: 6px;
  width: 300px;
  /* float:left; */
  /* margin-left: 18px; */
  font-size: 18px;
  font-family: 'NanumSquare', normal;
  background: linear-gradient(to right, #000, #000) 0px calc(100% )/calc(100% - 1px) 1px no-repeat;
}


div {
  margin-top: 0px;
  padding: 0px;
}

.wrapper{
  position: absolute;
  left :5%;
  top :20%;
  z-index: 2;
}

.roomform {
  background: yellow;
  width: 400px;
  height: 600px;
  /* border: 3px solid black; */
  border-radius: 5px;
  background-image: url('../../assets/gogh.jpg');
  margin-top: -40px;
  box-shadow: 6px 6px 8px 3px rgba(60,60,60,0.5);
}

/* .wrapper {
  float:left;
  padding: 0;
  position: absolute;
  top:400px;
  left:4%;
  transform: translate(-50%, -50%);
  width: 400px;
  height: 600px;
} */


/* .newroom {
  float:left;
  margin:0px;
} */

#about:hover {
  cursor: pointer;
}

#loading {
  margin-left: 680px;
  margin-top: 200px;
  position: absolute;
}


.btn-outline-dark{
  border-radius: 5px;
  /* float: right; */
  /* margin-right:10px; */
  border: 0px solid#03262f;
  font-family: 'NanumSquare', normal;
  font-size: 18px;
}
#profile {
  display: flex;
  flex-direction:column;
  text-align:center;
}

#makeroom {
  display: flex;
  flex-direction:column;
  float:left;
  margin-top: 40px;
  margin-left:40px;
  width:320px;
  height:520px;
  background: #FFFFFF;
  border-radius: 5px;
  /* border: 3px solid black; */

}

img {
  position: relative; bottom:0px; left:0px;
}

</style>
