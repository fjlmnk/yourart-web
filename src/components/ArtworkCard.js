import React from "react";

function ArtworkCard({ artwork }) {
  return (
    <div className="artwork-card">
      <img src={artwork.image} alt={artwork.title} />
      <h2>{artwork.title}</h2>
      <h3>{artwork.author}</h3>
      <p><strong>Рік:</strong> {artwork.year}</p>
      <p>{artwork.description}</p>
    </div>
  );
}

export default ArtworkCard;
