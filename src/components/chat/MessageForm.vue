<template>
  <form
    action="#"
    class="bg-light"
  >
    <div class="input-group">
      <textarea
        placeholder="Type a message"
        class="form-control rounded-0 border-0 py-2 bg-light"
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

<script lang="ts" setup>

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