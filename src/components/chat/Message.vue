<template>
  <div
    class="w-50 mb-3 message"
    :class="{'ml-auto': direction === 'out'}"
  >
    <h6
      class="mb-1 text-muted"
      v-if="direction === 'in'"
    >From: {{ sender.username }}</h6>
    <div class="d-flex align-items-center">
      <div
        class="spinner-border spinner-border-sm mr-2"
        role="status"
        v-if="!delivered"
      >
        <span class="sr-only">Loading...</span>
      </div>
      <div
        class="rounded py-2 px-3 mb-2 w-100"
        :class="colors.bg"
      >
        <p
          class="text-small mb-0"
          :class="colors.text"
        >{{ text }}</p>
      </div>
    </div>
    <p class="small text-muted">{{ formattedDate }}</p>
  </div>
</template>

<script lang="ts">
import { computed } from 'vue'
import { useStore } from 'vuex'


export default {
  props: {
    text: {
      type: String,
      required: true
    },
    date: {
      type: String,
      required: true
    },
    sender: {
      type: Object,
      required: true
    },
    delivered: {
      type: Boolean,
      required: true
    }
  },
  setup (props: any) {
    const store = useStore()

    const direction = computed(() => {
      return store.getters['user/profile'].username === props.sender.username ? 'out' : 'in'
    })

    const formattedDate = computed(() => {
      const date = Date.parse(props.date)
      const formater = Intl.DateTimeFormat('ru')

      return formater.format(date)
    })

    const colors = computed(() => {
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

    return {
      direction,
      formattedDate,
      colors
    }
  }
}


</script>
