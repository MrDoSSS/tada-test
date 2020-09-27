<template>
  <div class="container py-sm-5 px-sm-4">
    <ConnectionAlert />
    <div
      v-if="wsStatus === 'pending'"
      class="d-flex align-items-center flex-column"
    >
      <div class="mb-3">
        <div
          class="spinner-border"
          style="width: 3rem; height: 3rem;"
          role="status"
        >
          <span class="sr-only">Loading...</span>
        </div>
      </div>
      <h2>Wait websocket connection</h2>
    </div>
    <template v-else>
      <div
        class="row"
        v-if="wsStatus !== 'opened'"
      >
        <div
          class="alert alert-danger"
          role="alert"
        >
          No web socket connection. You cannot receive or send messages. Please, reload page.
        </div>
      </div>
      <div class="row rounded-lg overflow-hidden shadow bg-light">
        <div class="col-4 px-0">
          <div class="bg-white">
            <div class="px-3 py-2 bg-light">
              <p class="h5 mb-0 py-1">Rooms</p>
            </div>

            <div class="rooms-box d-flex flex-column justify-content-between">
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
                  v-if="hasRooms"
                >
                  <Room
                    v-for="room in rooms"
                    :name="room.name"
                    :last-message="room.lastMessage.text"
                    :key="room.name"
                  />
                </div>
                <div
                  class="h2 mb-0 h-100 d-flex justify-content-center align-items-center text-uppercase text-muted"
                  v-else
                >
                  no data
                </div>
              </template>
              <div class="w-100 dropup">
                <button
                  class="btn btn-secondary btn-block btn-lg rounded-0"
                  data-toggle="dropdown"
                >Create room</button>
                <div class="dropdown-menu">
                  <NewRoomForm />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-8 px-0 mt-5">
          <div class="chat-box">
            <router-view />
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts">
import { onMounted, ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useWsClient } from '@/websocket'
import Room from '@/components/chat/Room.vue'
import NewRoomForm from '@/components/chat/NewRoomForm.vue'
import ConnectionAlert from '@/components/ConnectionAlert.vue'

export default {
  components: {
    Room,
    NewRoomForm,
    ConnectionAlert
  },
  setup () {
    const store = useStore()
    const { status: wsStatus } = useWsClient()

    const userProfile = computed(() => store.getters['user/profile'])
    const rooms = computed(() => store.getters['chat/rooms/all'])
    const hasRooms = computed(() => store.getters['chat/hasRooms'])
    const loading = ref(false)

    onMounted(async () => {
      try {
        loading.value = true
        await store.dispatch('chat/rooms/fetch')
      } catch (e) {
        console.log(e)
      } finally {
        loading.value = false
      }
    })

    return {
      userProfile,
      rooms,
      hasRooms,
      loading,
      wsStatus
    }
  }
}

</script>

<style lang="scss" scoped>
.container {
  min-height: inherit;
}

.rooms-box,
.chat-box {
  height: 80vh;

  @media screen and (max-width: 600px) {
    height: 100vh;
  }
}

.rooms-box {
  overflow-y: scroll;
}
</style>