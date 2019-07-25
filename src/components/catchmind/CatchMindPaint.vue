<template>
<div id="cmpaint">
  <div>
    <nav class="navbar navbar-inverse navbar-fixed-top">

      <div class="navbar-inner">
        <button class="navbar-toggler" type="button" @click="gohome" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
            <img src="../../assets/logo.png" width="40" height="40" alt="" >
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

  <div class="main">
    <div class="row">
      <div class="col-9">
        <div v-if="isloading" class="spinner-border text-secondary" role="status">
          <span class="sr-only">Loading...</span>
        </div>
        <div v-else>
          <paint-draw :channel="activeRoom.id" :paintings="paintings"> </paint-draw>
        </div>
      </div>
      <div class="col-3 chat">
        <h2>Chat</h2>
        <div class="message-area">

            <div class="message-header">
                <div class="message-header-block">
                  <strong> Room </strong>
                  <p> {{activeRoom.name}} </p>
                </div>
                <div class="message-header-block">
                  <strong> ID </strong>
                  <p> {{currentUser.id}} </p>
                </div>
            </div>
            <!-- The messages component -->
            <Messages style="overflow-y:scroll; width:100%; height:100%; padding:4px; border:1 solid #000000;"

                :messages="messages"
                :currentUser="currentUser"
            />
            <!-- The inputform component -->
            <InputForm
                @newMessage="addMessage"
                @joinedRoom="joinedRoom=true"
                :activeRoom="activeRoom"
            />
            <div class="exit">
              <button type="button" class="btn btn-success" @click="onUploadImageFile">전시하기</button>
              <button type="button" class="btn btn-warning" @click="exit_room">방 나가기</button>
              <button type="button" class="btn btn-danger" @click="destroy"> 방 파괴</button>
            </div>
        </div>
      </div>
    </div>
 </div>
</div>
</template>


<script>

import Messages from './Messages.vue'
import InputForm from './InputForm.vue'
import PaintDraw from './PaintDraw.vue'

const resourceHost = 'http://143.248.39.49:4500'


export default{
  name: 'catch-mind',
  components: {
    'paint-draw': PaintDraw, Messages, InputForm
  },
  props: ['activeRoom', 'currentUser'],
  data(){
    return{
      isloading: false,
      messages: [],
      paintings: []
    }
  },
  created(){
    this.fetchData()
  },
  watch: {
    // 라우트가 변경되면 메소드를 다시 호출됩니다.
    '$route': 'fetchData'
  },
  methods: {
    goExhibition() {
      this.$router.push({name:'Exhibition'})
    },
    goAbout() {
      this.$router.push({name:'About'})
    },
    gohome() {
      this.$router.push({name:'CatchMindRooms',params:this.currentUser.username});
    },
    fetchData(){
      this.isloading = true
      this.$axios.get(`${resourceHost}/catchmind/get_paint/${this.activeRoom.id}`)
        .then(({data}) => {
          console.log("받아온 그림 데이터~~~~~~")
          console.log(data)
          this.paintings.push(data)
          this.isloading =false
          this.EnterRoom(this.activeRoom)
        })
    },
    EnterRoom(room) {
      this.messages = []
      console.log("방들어가는중~~~")
      this.currentUser
          .subscribeToRoomMultipart({
               roomId: room.id,
               hooks: {
                   onMessage: message => {
                       this.messages.push(message)
                   }
               },
               messageLimit: 40
           })
      console.log("방들가기 성공!!")
     },
     addMessage(message) {
        this.currentUser.sendSimpleMessage({
                  roomId: this.activeRoom.id,
                  text: message,
       })
     },
     onUploadImageFile(){

       console.log("이미지 전송 시작!!!!")

       var canvas = document.getElementById('canvas')
       let data = new FormData()

       let config = {
          header : {
            'Content-Type' :`multipart/form-data; boundary=${data._boundary}`
          }
        }

       canvas.toBlob( (blob) => {
        data.append('file',blob,`${this.activeRoom.name}_${this.currentUser.id}`)
        })

       var swal = this.$swal
       swal.fire({
        title: 'Complete?',
        text: "It will be displayed in Exhibition!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, It is completed!',
        showLoaderOnConfirm: true,
        preConfirm: () =>{
           return this.$axios.post(`${resourceHost}/exhibition/upload_image/${this.activeRoom.id}/${this.activeRoom.name}/${this.currentUser.id}`, data, config)
             .then(({data}) => {
               console.log(data)
             }).catch(error => {
               console.log("failfial")
               swal.showValidationMessage(`Request failed: ${error}`)
             })
           }
         }).then((result) => {
           console.log("aaaaaaa")
           console.log(result)
          if (result.value) {
            console.log("aaaaaa")
            swal.fire(
            'Displayed!!',
            'Your painting is displayed in Exhibitions!',
            'success'
            )
            .then(result =>{
              if(result.value){
                this.$router.push({name:'Exhibition'})
              }
            })
          }
      })
     },
     exit_room(){
       this.$router.push('/catchmind/'+this.currentUser.id)

     },
     destroy(){
       var swal = this.$swal
       swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, destroy it!',
        showLoaderOnConfirm: true,
        preConfirm: () =>{
          return this.$axios.delete(`${resourceHost}/catchmind/delete_room/${this.activeRoom.id}`)
            .then( ({data}) => {
              console.log(data)
              if (data.ok){
                return data
              }
            })
            .catch(error =>{
              swal.showValidationMessage(`Request failed: ${error}`)
            })
        }
        }).then((result) => {
          console.log(result)
          if (result.value.ok) {
            swal.fire(
            'Destroyed!',
            'Your painting has been destroyed.',
            'success'
            )
            .then(result =>{
              if(result.value){
                this.$router.push('/catchmind/'+this.currentUser.id)
              }
            })
          }
      })
    },

  }
}

</script>

<style scoped>
@font-face { font-family: 'Binggrae-Bold'; src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_one@1.0/Binggrae-Bold.woff') format('woff'); font-weight: normal; font-style: normal; }
@font-face { font-family: 'NotoSerifKR'; src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_two@1.0/NotoSerifKR.woff') format('woff'); font-weight: normal; font-style: normal; }
@font-face { font-family: 'NIXGONM-Vb'; src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_six@1.2/NIXGONM-Vb.woff') format('woff'); font-weight: normal; font-style: normal; }

#cmpaint {
  background-image: url('../../assets/cardboard-1920x1080.png');
  height : 100vh;
  width : 100vw;
  font-family: "Binggrae-Bold";
}

#about:hover {
  cursor: pointer;
}
#ex:hover {
  cursor: pointer;
}

.main{
  padding-left :2%;
  padding-right :2%;
}
.navbar {
  margin-bottom: 50px;
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

.message-area{
        display: grid;
        position: relative;
        grid-template-areas: "head"
                             "messages"
                             "input"
                             "exit";
        grid-gap:10px;
        height: 700px;
        grid-template-rows: 1fr 10fr 1fr 1fr;
}
.message-header{
        grid-area: head;
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap:10px;
}
.message-header-block{
  background: rgba(230, 250, 252, 0.945);
  /* text-align:center; */
  border-radius: 6px;
  border: 0px;
}
.exit{
  grid-area: exit;
}

.chat{
  padding-top: 1%;
  height :auto;
}
h5 {
  font-size: 1.5vw;
  color: #03262f;
  font-family: 'Binggrae-Bold',normal;
}
h2 {

}

</style>
