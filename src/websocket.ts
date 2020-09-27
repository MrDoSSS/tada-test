class WsClient {
  websocket: WebSocket | undefined

  connect (url: string) {
    this.websocket = new WebSocket(url)
  }

  on (event: 'open' | 'close' | 'error' | 'message', cb: (this: WebSocket, event: Event & { data?: string }) => any): boolean {
    if (!this.websocket) return false

    switch (event) {
      case 'open':
        this.websocket.onopen = cb
        break
      case 'close':
        this.websocket.onclose = cb
        break
      case 'error':
        this.websocket.onerror = cb
        break
      case 'message':
        this.websocket.onmessage = cb
        break
    }

    return true
  }

  send (data: any) {
    this.websocket?.send(JSON.stringify(data))
  }
}

export const wsClient = new WsClient()