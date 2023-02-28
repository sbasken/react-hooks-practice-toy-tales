import React from "react";

function ToyCard({ id, name, image, likes, onDeleteToy, onUpdateToys}) {

  const handleDelete = (id) => {
    fetch(`http://localhost:3001/toys/${id}`, {
      method: "DELETE"
    })
      .then(res => res.json())
      .then(() => onDeleteToy(id))
  }

  const handleLikes = (id) => {
    const newLikes = likes + 1
    console.log(newLikes)
    fetch(`http://localhost:3001/toys/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({ likes: newLikes})
    })
      .then(res => res.json())
      .then(updatedToy => onUpdateToys(updatedToy))
  }

  return (
    <div className="card">
      <h2>{name}</h2>
      <img
        src={image}
        alt={name}
        className="toy-avatar"
      />
      <p>{likes} Likes </p>
      <button className="like-btn" onClick={()=>handleLikes(id)}>Like {"<3"}</button>
      <button className="del-btn" onClick={()=>handleDelete(id)}>Donate to GoodWill</button>
    </div>
  );
}

export default ToyCard;
