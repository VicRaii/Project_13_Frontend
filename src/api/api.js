const API = import.meta.env.VITE_API_URL

const getSeries = async () => {
  const res = await fetch(`${API}/series`)
  return res.json()
}

const getPreachings = async () => {
  const res = await fetch(`${API}/preachings`)
  return res.json()
}

export { getSeries, getPreachings }
