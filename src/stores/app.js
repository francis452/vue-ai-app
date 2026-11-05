import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    appName: 'Vue AI App',
    visitCount: 0,
  }),
  actions: {
    incrementVisitCount() {
      this.visitCount += 1
    },
  },
})
