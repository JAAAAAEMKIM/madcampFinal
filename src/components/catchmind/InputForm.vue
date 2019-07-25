<!-- ./src/components/InputForm.vue -->
<template>
    <div class="input-area">
        <div class="input">
            <textarea
                class="input-message"
                v-model="new_message"
                placeholder="Type a message"
                rows="1"
                @keyup.shift.enter="resizeInput"
                @keyup.exact.enter="sendMessage">
            </textarea>
        </div>
    </div>
</template>

<script>
export default {
  name: "input-form",
  props: ['activeRoom', ],
  data () {
    return {
        new_message: "",
    }
  },
  methods: {
    sendMessage(el) {
        if (!this.new_message) return;
        this.$emit('newMessage', this.new_message)
        this.new_message = ""
        el.target.style = 'height:auto;';
    },
    resizeInput(el) {
        if (el.target.scrollHeight < 80) {
            setTimeout(function() {
                el.target.style = 'height:auto; padding:0';
                el.target.style = 'height:' + el.target.scrollHeight + 'px';
            }, 0);
        }
    }
  }
}
</script>

<style scoped>
.input-message{
  width : 90%;
  border-radius: 3px;
  border : 1px solid
}
</style>
