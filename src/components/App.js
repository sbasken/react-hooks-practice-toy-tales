import React, { useState, useEffect } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [ toys, setToys ] = useState([])

  useEffect(()=>{
    fetch("http://localhost:3001/toys")
      .then(res => res.json())
      .then(data => setToys(data))
  }, [])

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  function addToy(newToy) {
    setToys([...toys, newToy])
  }

  function deleteToy(id) {
    const updatedToys = toys.filter(toy => toy.id !== id)
    setToys(updatedToys)
  }

  function updateToys(updatedToy) {
    const updatedToys = toys.map(toy => {
      if (toy.id === updatedToy.id) {
        return updatedToy
      } else {
        return toy
      }
    })
    setToys(updatedToys)
  }

  return (
    <>
      <Header />
      {showForm ? <ToyForm onAddToy={addToy}/> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer toys={toys} onDeleteToy={deleteToy} onUpdateToys={updateToys}/>
    </>
  );
}

export default App;
