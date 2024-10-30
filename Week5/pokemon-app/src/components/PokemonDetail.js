import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Typography } from "@mui/material";

function PokemonDetail() {

  const {name} = useParams();
  const [pokemon, setPokemon] = useState(null);

  function fetchPokemonDetail() {
    axios.get(`https://poke.api.co/api/v2/pokemon/${name}`).then((response) => {
      setPokemon(response.data);
    });
  }

  const imageUrl = 'https://placehold.co/400'

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <img src={imageUrl} alt={name} />
    </div>
  );
}

export default PokemonDetail;
