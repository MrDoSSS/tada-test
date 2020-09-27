import { ref } from 'vue'

class WsClient {
  websocket: WebSocket | undefined
  status = ref('pending')

  connect (url: string) {
    this.websocket = new WebSocket(url)

    this.on('open', () => this.status.value = 'opened')
    this.on('error', () => this.status.value = 'error')
    this.on('close', () => this.status.value = 'closed')
  }

  on (event: string, cb: (event: Event & { data?: string }) => any): boolean {
    if (!this.websocket) return false

    this.websocket.addEventListener(event, cb)

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