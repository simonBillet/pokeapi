import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {ajoutPokemonMesFavoris, requeteDetailPokemon, selectPokemonsListe} from "./pokemonsSlice";


export const PokemonCard = () => {
    // Récupération des pokémons
    const pokemons = useSelector(selectPokemonsListe)

    // dispatch
    const dispatch = useDispatch()

    // Permet d'aller chercher les données du pokémon qui viens d'être ciblé par l'utilisateur
    const pokemonCible = (name) => {
        dispatch(requeteDetailPokemon(name))
    }

    // Récupération de l'id du pokémon grâce à l'url du pokémon qui le contient
    // cet id sera utilisé dans un autre url pour récupérer l'image
    const image = (urlImage) => {
        let image = urlImage.split('/')
        let resultatImage = image[6]
        return resultatImage
    };

    // Affichage des pokémons qui sont contenu dans la liste
    const pokemonCard = pokemons.results.map(pokemon => (
        <div className={"card-pokemon-liste"}>
            <img onClick={() => pokemonCible(pokemon.name)} src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + image(pokemon.url) + ".png"}/>
            <button key={pokemon.name} onClick={() => pokemonCible(pokemon.name)} className={"bouton-pokemon-liste"}>{pokemon.name}</button>
        </div>
    ))

    return (
        pokemonCard
    )
}
