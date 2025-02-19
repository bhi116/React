import { useState } from 'react'
import './App.css'

function App() {

  const [trip, setTrip] = useState({destination: '', duration: ''});
  const [trips, setTrips] = useState([]);

  const addTrip = () => {
    console.log("Laitetaan matka trips-taulukkoon");
    setTrips([...trips, trip]);
  }

  const removeTrip = (index) => {
    console.log("Mennään poistamaan matka trips-taulukosta" + index)
    setTrips(trips.filter((trip, i) => i !== index));
  }

  return (
    <>
      
      <h1>My trips</h1>
      <input 
      type="text"
      name="destination"
      placeholder='Syötä kohde'
      value={trip.destination}
      onChange={(event) => setTrip({...trip, destination: event.target.value})}
      />
      <input
      type="text"
      name="duration"
      placeholder='Syötä kesto'
      value={trip.duration}
      onChange={(event) => setTrip({...trip, duration: event.target.value})}
      />

    <button onClick={addTrip}>Add</button>

    <table>
      <tbody>
        <tr>
          <th>
            Matkan kohde
          </th>
          <th>
            Matkan kesto
          </th>
        </tr>
        {
          trips.map((matka, index) => (
            <tr key={index}>
              <td>{matka.destination}</td>
              <td>{matka.duration}</td>
              <td><button onClick={() => removeTrip(index)}>Poista</button></td>
            </tr>
          ))
        }
      </tbody>
    </table>

    </>
  )
}

export default App
