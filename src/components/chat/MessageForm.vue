<template>
  <form
    class="bg-light"
    @submit.prevent="send"
  >
    <div class="input-group">
      <textarea
        placeholder="Type a message"
        class="form-control rounded-0 border-0 py-2 bg-light"
        :maxlength="maxMessageLength"
        v-model="text"
      ></textarea>
      <div class="input-group-append d-flex">
        <button
          type="submit"
          class="btn btn-link shadow-none"
        > <svg
            class="bi"
            width="32"
            height="32"
            fill="currentColor"
          >
            <use xlink:href="bootstrap-icons.svg#cursor-fill" />
          </svg></button>
      </div>
    </div>
  </form>
</template>

<script lang="ts">
import { computed, ref } from 'vue'
import { useStore } from 'vuex'

export default {
  props: {
    roomName: {
      type: String,
      required: true
    }
  },
  setup (props: any) {
    const store = useStore()

    const maxMessageLength = computed(() => store.getters['settings/maxMessageLength'])

    const text = ref('')

    const send = () => {
      if (!text.value) return

      store.dispatch('chat/messages/send', { text: text.value, room: props.roomName })
      text.value = ''
    }

    return {
      maxMessageLength,
      text,
      send
    }
  }
}
</script>

<style scoped>
textarea {
  resize: none;
}

button[type="submit"] {
  outline: none;
  border: none;
  box-shadow: none;
}
</style>