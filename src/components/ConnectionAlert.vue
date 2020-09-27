<template>
  <div
    class="row"
    v-if="!isOnline"
  >
    <div
      class="alert alert-danger"
      role="alert"
    >
      No internet connection. You cannot receive or send messages
    </div>
  </div>
</template>

<script lang="ts">
import { useNetworkStatus } from '@/plugins/network-status'
export default {
  setup () {
    const isOnline = useNetworkStatus()
    return {
      isOnline
    }
  }
}
</script>

<style>
</style>