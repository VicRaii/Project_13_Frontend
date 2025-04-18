import { useEffect, useState } from 'react'
import { getPreachings } from '../api/api'

const Preachings = () => {
  const [preachings, setPreachings] = useState([])

  useEffect(() => {
    const fetchPreachings = async () => {
      try {
        const data = await getPreachings()
        console.log('Datos de predicaciones:', data) // Verifica los datos aquí
        setPreachings(data)
      } catch (error) {
        console.error('Error fetching preachings:', error)
      }
    }

    fetchPreachings()
  }, [])

  return (
    <div>
      <h2>Predicaciones</h2>
      <ul>
        {preachings.map((p) => (
          <li key={p._id}>
            <h4>{p.title}</h4>
            <p>
              <strong>Predicador:</strong> {p.preacher || 'No especificado'}
            </p>
            <p>
              <strong>Fecha:</strong>{' '}
              {p.date
                ? new Date(p.date).toLocaleDateString()
                : 'Fecha no disponible'}
            </p>
            <p>{p.content || 'Sin descripción disponible.'}</p>
            {p.videoUrl && (
              <a href={p.videoUrl} target='_blank' rel='noopener noreferrer'>
                Ver video
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Preachings
