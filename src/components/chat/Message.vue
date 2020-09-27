<template>
  <div
    class="w-50 mb-3 message"
    :class="{'ml-auto': direction === 'out'}"
  >
    <h6
      class="mb-1 text-muted"
      v-if="direction === 'in'"
    >From: {{ sender.username }}</h6>
    <div
      class="rounded py-2 px-3 mb-2"
      :class="colors.bg"
    >
      <p
        class="text-small mb-0"
        :class="colors.text"
      >{{ text }}</p>
    </div>
    <p class="small text-muted">{{ formattedDate }}</p>
  </div>
</template>

<script lang="ts" setup="props">
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

declare const props: {
  text: string
  date: string
  sender: Tada.UserProfile
}

export const direction = computed(() => {
  return store.getters['user/profile'].username === props.sender.username ? 'out' : 'in'
})

export const formattedDate = computed(() => {
  const date = Date.parse(props.date)
  const formater = Intl.DateTimeFormat('ru')

  return formater.format(date)
})

export const colors = computed(() => {
  if (direction.value === 'out') {
    return {
      bg: 'bg-primary',
      text: 'text-white'
    }
  } else {
    return {
      bg: 'bg-light',
      text: 'text-muted'
    }
  }
})
</script>
