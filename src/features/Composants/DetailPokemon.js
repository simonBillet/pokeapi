import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {
    ajouterPokemonMesFavoris,
    selectDetailPokemonCible,
    selectListeMesFavoris,
    selectorStatusPokemonCible, supprimerPokemonMesFavoris
} from "../Service/pokemonsSlice";

export const DetailPokemon = () => {
    // Variable contenant les informations sur le pokémon qui a été sélectionné
    const pokemon = useSelector(selectDetailPokemonCible)

    const listPokemon = useSelector(selectListeMesFavoris)

    // dispatch
    const dispatch = useDispatch()

    // statut de la requête
    const state = useSelector(selectorStatusPokemonCible)

    // On vérifie si le pokémon sélectionné est déjà un favoris
    // Si oui, on affiche un bouton pour l'enlever des favoris
    // Si non, on affiche un bouton pour l'ajouter aux favoris
    const verifFavoris = () => {
        let estFavoris = false

        listPokemon.forEach(poke => {
            if (poke.id === pokemon.id){
                estFavoris = true
            }
        })

        if (estFavoris){
            return (<button className={"card-detail-bouton-supprimer-favoris"} onClick={supprimerPokemonFavoris} role={"Supprimer-favoris"}>Supprimer de mes favoris</button>)
        } else {
            return (<button className={"card-detail-bouton-ajouter-favoris"} onClick={ajouterPokemonFavoris} role={"Ajouter-favoris"}>Ajouter à mes favoris</button>)
        }
    }

    // Permet d'ajouter le pokémon à la liste des pokémons favoris de l'utilisateur
    const ajouterPokemonFavoris = () => {
        dispatch(ajouterPokemonMesFavoris(pokemon))
    }

    // Permet de supprimer le pokémon de la liste des pokémons favoris
    const supprimerPokemonFavoris = () => {
        dispatch(supprimerPokemonMesFavoris(pokemon))
    }

    // Permet d'avoir les informations détaillé du pokémon
    const affichageDetailPokemon = (
        <div className={"card-detail-pokemon"}>
            <img className={"card-detail-pokemon-image"} src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + pokemon.id + ".png"} alt={"pokemon"}/>
            <h2 className={"card-detail-pokemon-nom"}>{pokemon.name}</h2>
            {verifFavoris()}
            <p className={"card-detail-pokemon-sous-titres"}> Type(s) :</p>
            <div className={"card-detail-pokemon-div"}>
                {pokemon.length !== 0
                    ?pokemon.types.map(type => (
                        <img className={"card-detail-pokemon-image-type"} src={window.location.origin + '/types/' + type.type.name + '.png'} alt={"type"}/>
                    ))
                    :''
                }
            </div>
            <p className={"card-detail-pokemon-sous-titres"}> Statistiques :</p>
            <div className={"card-detail-pokemon-div"}>
                {pokemon.length !== 0
                    ?pokemon.stats.map(stat => (
                        <p className={"card-detail-pokemon-texte"}><strong>{ stat.stat.name }</strong> : { stat.base_stat }</p>
                    ))
                    :''
                }
            </div>
            <p className={"card-detail-pokemon-sous-titres"}> Autres :</p>
            <div className={"card-detail-pokemon-div"}>
                <p className={"card-detail-pokemon-texte"}><strong>hauteur</strong> : {pokemon.height}</p>
                <p className={"card-detail-pokemon-texte"}><strong>poids</strong> : {pokemon.weight}</p>
            </div>
        </div>
    )

    return(
        <div>
            {state !== 'rien'
                ? affichageDetailPokemon
                : <p>Aucun pokémon sélectionné</p>
            }
        </div>
    );
}
