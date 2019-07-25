<template>
  <div id ="sign">
    <h1>SIGN IN</h1>
    <div>
      <form @submit.prevent="onSignin(username, password)">
        <input v-model="username" type="text" placeholder="Enter Username" >
        <input v-model="password" type="password" placeholder="Enter Password" >
        <label>
          <input v-model="remember" type="checkbox" checked="checked"> Remember me
        </label>
        <p style="color:red"> {{error_msg}} </p>
        <button type="submit">LOG IN</button>
        <!-- <input type="submit" value="SIGN IN"> -->
      </form>
    </div>
    <button onclick="location.href='./#/signup'">SIGN UP</button>
    <br><br>
    <p class="or">---------------------------------     OR     ---------------------------------</p>
    <p>Continue with Facebook</p>
    <p>Continue with Google</p>
    <p>Continue without Sign in</p>

  </div>
</template>

<script>
export default{
  name: 'sign-in',
  data() {
    return {
      username: "",
      password: "",
      error_msg: "",
      remember: true
    }
  },
  methods: {
    onSignin(username, password){
      this.$store.dispatch('LOGIN', {username, password})
        .then((data) => this.redirect())
        .catch( e => this.error_msg = e.message)
    },
    redirect() {
      const Toast = this.$swal.mixin({
        toast: true,
        position: 'top',
        showConfirmButton: false,
        timer: 3000
      });

      Toast.fire({
        type: 'success',
        title: 'Signed in successfully'
      })
      this.$router.push('/catchmind/'+this.username);
    }
  }
}
</script>
<style scoped>

p {
  font-family: 'NanumSquare';
  font-size: 18px;
}
.or {
  font-size: 15px;
}

h1 {
  margin:20px 0;
}
/* Full-width input fields */
input[type=text], input[type=password] {
  width: 90%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  box-sizing: border-box;
}
button {
  background-color: #4CAF50;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 90%;
}
button:hover {
  opacity: 0.8;
}
/* Extra styles for the cancel button */
.cancelbtn {
  width: auto;
  padding: 10px 18px;
  background-color: #f44336;
}
.container {
  padding: 16px;
}
.signin{
  width: 450px;
  height: 300px;
}
span.psw {
  float: right;
  padding-top: 16px;
}
</style>
