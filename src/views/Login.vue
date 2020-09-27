<template>
  <div class="login text-center d-flex justify-content-center align-items-center">
    <form @submit.prevent="login">
      <label
        for="username"
        class="sr-only"
      >Username</label>
      <input
        type="text"
        id="username"
        class="form-control form-control-lg"
        placeholder="Username"
        required
        autofocus
        :maxlength="maxUsernameLength"
        v-model="username"
      >
      <button
        class="btn btn-lg btn-primary btn-block"
        type="submit"
      >Sign in</button>
    </form>
  </div>
</template>

<script lang="ts">
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

export default {
  setup () {
    const router = useRouter()
    const store = useStore()

    const username = ref('')
    const maxUsernameLength = computed(() => store.getters['settings/maxUsernameLength'])

    const login = async () => {
      await store.dispatch('user/login', { username })
      router.push({ name: 'chat-index' })
    }

    return {
      username,
      maxUsernameLength,
      login
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  min-height: inherit;
}

#username {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

button[type="submit"] {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>