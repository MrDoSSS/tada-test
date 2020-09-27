<template>
  <div class="h-100 d-flex flex-column">
    <div class="px-4 py-3 bg-white flex-grow-1 overflow-auto">
      <div
        class="h-100 d-flex justify-content-center align-items-center text-uppercase text-muted"
        v-if="loading"
      >
        <div
          class="spinner-border"
          style="width: 3rem; height: 3rem;"
          role="status"
        >
          <span class="sr-only">Loading...</span>
        </div>
      </div>
      <template v-else>
        <div
          class="list-group rounded-0"
          ref="listGroup"
          v-if="hasMessages"
        >
          <Message
            v-for="message in messages"
            :key="message.created"
            :date="message.created"
            :text="message.text"
            :sender="message.sender"
            :delivered="message.delivered"
          />
        </div>
        <div
          class="h2 mb-0 h-100 d-flex justify-content-center align-items-center text-uppercase text-muted"
          v-else
        >
          no messages
        </div>
      </template>
    </div>

    <MessageForm
      :room-name="roomName"
      class="py-2"
    />
  </div>
</template>

<script lang="ts">
import { onMounted, ref, computed, onUpdated } from 'vue'
import { useRoute, onBeforeRouteUpdate } from 'vue-router'
import { useStore } from 'vuex'
import MessageForm from '@/components/chat/MessageForm.vue'
import Message from '@/components/chat/Message.vue'

export default {
  components: {
    MessageForm,
    Message
  },
  setup () {
    const store = useStore()
    const route = useRoute()

    const listGroup = ref<HTMLDivElement>()
    const roomName = computed(() => route.params.name)
    const messages = computed(() => store.getters['chat/rooms/messages'](roomName.value))
    const hasMessages = computed(() => store.getters['chat/rooms/hasMessages'](roomName.value))
    const loading = ref(false)

    onUpdated(() => {
      listGroup.value?.querySelector('.list-group .message:last-child')?.scrollIntoView()
    })

    async function fetchMessages (roomName: string) {
      try {
        loading.value = true
        await store.dispatch('chat/messages/fetch', roomName)
      } catch (e) {
        console.log(e)
      } finally {
        loading.value = false
      }
    }

    onMounted(() => fetchMessages(roomName.value.toString()))

    onBeforeRouteUpdate((to, from) => {
      if (to.params.name === from.params.name) return

      fetchMessages(to.params.name.toString())
    })

    return {
      listGroup,
      roomName,
      messages,
      hasMessages,
      loading
    }
  }
}
</script>

