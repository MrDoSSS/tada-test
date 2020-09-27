<template>
  <div
    class="d-flex ml-2"
    @keydown.enter="visitRoom"
  >
    <input
      placeholder="Room name"
      class="form-control rounded-0 border-0 py-2 bg-light"
      :maxlength="maxRoomNameLength"
      v-model="roomName"
    />
    <div class="input-group-append d-flex">
      <button
        class="btn btn-link shadow-none"
        @click="visitRoom"
      >
        <svg
          class="bi"
          width="32"
          height="32"
          fill="currentColor"
        >
          <use xlink:href="bootstrap-icons.svg#forward-fill" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

export default {
  setup () {
    const store = useStore()
    const router = useRouter()

    const roomName = ref('')
    const maxRoomNameLength = computed(() => store.getters['settings/maxRoomNameLength'])

    const visitRoom = () => {
      router.push({ name: 'chat-room', params: { name: roomName.value } })
      roomName.value = ''
    }

    return {
      roomName,
      maxRoomNameLength,
      visitRoom
    }
  }
}


</script>

<style>
</style>