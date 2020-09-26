export function get (key: string) {
  const value = localStorage.getItem(key)

  if (!value) return null

  try {
    return JSON.parse(value)
  } catch {
    return value
  }
}

export function set (key: string, value: any) {
  localStorage.setItem(key, JSON.stringify(value))
}