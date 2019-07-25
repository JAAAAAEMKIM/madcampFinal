<template>
  <div class="hello">
      <!-- <h4 data-v-1e46e7ac="" class="home__title"> ,Pablo</h4> -->
      <div class="wrapper">
          <br><br>
          <h1>PICASSO</h1>
          <h2>PAINT YOURSELF</h2>

            <br>
            <h3>~ ft. Head Designer G.One.Lee ~</h3>

          <br>
          <h2>SIGN UP</h2>
          <div>
            <form @submit.prevent="onSignup(username, password, passwordConfirm, name, email)">
              <!-- <p>Username</p> -->
              <input type="text" v-model="username" placeholder="Username" />
              <p style="color:red">{{username_err}}</p>
              <!-- <p>Password</p> -->
              <input type="password" v-model="password" placeholder="Password" />
              <p style="color:red">{{password_err}}</p>
              <!-- <p>Password Confirmation</p> -->
              <input type="password" v-model="passwordConfirm" placeholder="Password Confirmation" />
              <p style="color:red">{{passwordConfirm_err}}</p>
              <!-- <p>Name</p> -->
              <input type="text"v-model="name" placeholder="Name" />
              <p style="color:red">{{name_err}}</p>
              <!-- <p>Email</p> -->
              <input type="email" v-model="email" placeholder="Email" /><br><br>
              <input type="submit" value="SIGN UP">
            </form>
          </div>
    </div>
  </div>
</template>

<script>
export default{
  name: 'sign-up',
  data() {
    return {
      username: "",
      username_err: "",
      password: "",
      password_err: "",
      passwordConfirm: "",
      passwordConfirm_err: "",
      name: "",
      name_err: "",
      email: "",
      error_msg: ""
    }
  },
  methods: {
    Initialize(){
      this.username_err = ""
      this.password_err = ""
      this.passwordConfirm_err = ""
      this.name_err = ""
    },
    onSignup(username, password, passwordConfirm, name, email){
      this.Initialize()
      this.$axios.post(`https://143.248.39.49:4500/users`,
        { 'username' : username,
          'password' : password,
          'passwordConfirmation' : passwordConfirm,
          'name' : name,
          'email': email })
        .then(({data}) => {
          if(data.success){
            const Toast = this.$swal.mixin({
              toast: true,
              position: 'top',
              showConfirmButton: false,
              timer: 3000
            });

            Toast.fire({
              type: 'success',
              title: 'Signed up successfully'
            })

            this.$router.push({name: 'HelloWorld'})
          } else {
            console.log(data)
            if(data.errors){
              for(var key in data.errors){
                switch(key){
                  case 'username':
                    this.username_err = data.errors[key].message
                    break
                  case 'password':
                    this.password_err = data.errors[key].message
                    break
                  case 'passwordConfirmation':
                    this.passwordConfirm_err = data.errors[key].message
                    break
                  case 'name':
                    this.name_err = data.errors[key].message
                    break
                }
              }
            }
          }
        })
    },
  }
}
</script>

<style scoped>
.hello {
  height : 100vh;
  background-image: url('../../assets/cardboard-1920x1080.png');
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

input[type=text], input[type=password], input[type=email] {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  box-sizing: border-box;
}
input[type=submit] {
  background-color: #4CAF50;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
}
input[type=submit]:hover {
  opacity: 0.8;
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
.wrapper {
  margin:40px;
  padding: 0;
  background: #FFFFF;
  position: absolute;
  top:30%;
  left:50%;
  transform: translate(-50%, -50%);
  width: 450px;
  height: 600px;
}
</style>
