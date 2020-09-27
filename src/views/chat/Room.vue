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
          v-if="hasMessages"
        >
          <Message
            v-for="message in messages"
            :key="message.created"
            :date="message.created"
            :text="message.text"
            :sender="message.sender"
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

    <MessageForm class="py-2" />
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, computed } from 'vue'
import { useRoute, onBeforeRouteUpdate } from 'vue-router'
import { useStore } from 'vuex'

export { default as MessageForm } from '@/components/chat/MessageForm.vue'
export { default as Message } from '@/components/chat/Message.vue'

const store = useStore()
const route = useRoute()

export const roomName = computed(() => route.params.name)

export const messages = computed(() => store.getters['chat/rooms/messages'](roomName.value))
export const hasMessages = computed(() => store.getters['chat/rooms/hasMessages'](roomName.value))

export const loading = ref(false)

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
</script>

