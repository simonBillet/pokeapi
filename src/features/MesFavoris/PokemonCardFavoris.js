import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {requeteDetailPokemon, selectListeMesFavoris} from "../Service/pokemonsSlice";


export const PokemonCardFavoris = () => {
    // Récupération des pokémons
    const pokemons = useSelector(selectListeMesFavoris)

    // dispatch
    const dispatch = useDispatch()

    // Permet d'aller chercher les données du pokémon qui viens d'être ciblé par l'utilisateur
    const pokemonCible = (name) => {
        dispatch(requeteDetailPokemon(name))
    }

    // Affichage des pokémons qui sont contenu dans la liste
    const pokemonCard = pokemons.map(pokemon => (
        <div className={"card-pokemon-liste"}>
            <img onClick={() => pokemonCible(pokemon.name)} src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + pokemon.id + ".png"} alt={"pokemon"}/>
            <button key={pokemon.name} onClick={() => pokemonCible(pokemon.name)} className={"bouton-pokemon-liste"}>{pokemon.name}</button>
        </div>
    ))

    return (
        pokemonCard
    )
}
