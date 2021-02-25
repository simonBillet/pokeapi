import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {requeteDetailPokemon, selectPokemonListeType} from "./pokemonsSlice";


export const PokemonCardType = () => {
    // Récupération des pokémons
    const pokemons = useSelector(selectPokemonListeType)

    // dispatch
    const dispatch = useDispatch()

    // Permet d'aller chercher les données du pokémon qui viens d'être ciblé par l'utilisateur
    const pokemonCible = (name) => {
        dispatch(requeteDetailPokemon(name))
    }

    // Récupération de l'id du pokémon grâce à l'url du pokémon qui le contient
    // Cet id sera utilisé dans un autre url pour récupérer l'image
    const image = (urlImage) => {
        let image = urlImage.split('/')
        let resultatImage = image[6]
        return resultatImage
    };

    // Affichage des pokémons qui sont contenu dans la liste
    const pokemonCard = pokemons.pokemon.map(pokemon => (
        <div className={"card-pokemon-liste"}>
            <img onClick={() => pokemonCible(pokemon.pokemon.name)} src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + image(pokemon.pokemon.url) + ".png"}/>
            <button key={pokemon.pokemon.name} onClick={() => pokemonCible(pokemon.pokemon.name)} className={"bouton-pokemon-liste"}>{pokemon.pokemon.name}</button>
        </div>
    ))

    return (
        pokemonCard
    )
}
