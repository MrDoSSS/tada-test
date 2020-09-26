declare module '*.vue' {
  import { defineComponent } from 'vue'
  const component: ReturnType<typeof defineComponent>
  export default component
}

declare module '@/store/modules' {
  import { Module } from 'vuex'
  const modules: { [key: string]: Module }
  export = modules
}