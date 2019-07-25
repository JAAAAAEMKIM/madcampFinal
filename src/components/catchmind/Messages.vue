<!-- ./src/components/Messages.vue -->
<template>
    <div class="messages">
        <div id="m"  v-for="message in messages" :key="message.id">
            <div :class="['message-container message', messageDirection(message, 'float-')]">
                <div class="chat-name"> {{ message.sender.name }} </div>
                <template v-for="part in message.parts">
                    {{part.payload.content}}
                </template>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "messages",
    props: ['messages', 'currentUser'],
    methods: {
      messageDirection(message, css='') {
        return (message.senderId !== this.currentUser.id) ? `${css}left` : `${css}right`
      }
    },
}
</script>

<style scoped>
.messages {
        grid-area: messages;
        overflow-y: auto;
        overflow-x: hidden;
        padding: 15px 30px;
        background: #929292ad;
        text-align:center;
          /* border-radius: 10px; */
            border: 2px solid gray;
}

.messages .slider {
  /* text-align:center; */
    border-radius: 6px;
    border: 0px;
}
.float-left {
        float: left;
        clear: both;
        background-color: white;
        color: rgba(28, 19, 64, 0.87);
        text-align: left;
}
.float-right {
        float: right;
        clear: both;
        color: #000000;
        background: #cbe4cbf2;
        text-align: right;
}
.chat-name{
       margin: 1px 0px 3px 0px;
       color: #177a2d;
}
.message {
        border-radius: 3px;
        width: fit-content;
        padding: 7px;
        margin: 3px 0px;
        clear: both;
        max-width: 50%;
        min-width: 10%;
        word-wrap: break-word;
}

</style>
