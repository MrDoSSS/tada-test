import { ref } from 'vue'

class WsClient {
  websocket: WebSocket | undefined
  status = ref('pending')

  connect (url: string) {
    this.websocket = new WebSocket(url)

    this.websocket.onopen = () => this.status.value = 'opened'
    this.websocket.onerror = () => this.status.value = 'error'
    this.websocket.onclose = () => this.status.value = 'closed'
  }

  on (cb: (this: WebSocket, event: Event & { data?: string }) => any): boolean {
    if (!this.websocket) return false

    this.websocket.onmessage = cb

    return true
  }

  send (data: any) {
    this.websocket?.send(JSON.stringify(data))
  }
}

export const wsClient = new WsClient()

export const useWsClient = () => {
  return {
    on: wsClient.on,
    send: wsClient.send,
    status: wsClient.status
  }
}