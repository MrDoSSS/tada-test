<template>
  <router-link
    :to="{name: 'chat-room', params: {name: name}}"
    v-slot="{isActive}"
    class="list-group-item list-group-item-action rounded-0"
  >
    <div
      class="d-flex align-items-center justify-content-between mb-1"
      :class="{'text-white': isActive}"
    >
      <h5 class="mb-0"><strong>{{ name }}</strong></h5>
    </div>
    <p
      class="mb-0 message"
      :class="isActive ? 'text-white': 'text-muted'"
    >{{ truncatedLastMessage }}</p>
  </router-link>
</template>

<script lang="ts" setup="props">
import { computed } from 'vue'


declare const props: {
  name: string
  lastMessage: string
}

export const truncatedLastMessage = computed(() => {
  return props.lastMessage.length <= 100 ? props.lastMessage : props.lastMessage.slice(0, 100) + '...'
})

</script>

<style scoped>
.message {
}
</style>