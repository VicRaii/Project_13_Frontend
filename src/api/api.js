const API = import.meta.env.VITE_API_URL

const getEvents = async () => {
  const res = await fetch(`${API}/events`)
  return res.json()
}

const getPreachings = async () => {
  const res = await fetch(`${API}/preachings`)
  return res.json()
}

export { getEvents, getPreachings }
