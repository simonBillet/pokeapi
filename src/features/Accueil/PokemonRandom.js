import React, {useEffect} from "react";
import {useDispatch} from "react-redux";
import {
    ajouterPokemonMesFavoris,
    requetePokemonId,
    selectDetailPokemonAleatoire, selectListeMesFavoris,
    selectorStatusPokemonAleatoire, supprimerPokemonMesFavoris
} from "../Service/pokemonsSlice";
import { useSelector } from "react-redux";
import {Spinner} from "../Composants/Spinner";

export const PokemonRandom = () => {
    // Informa sur le pokémon
    const pokemon = useSelector(selectDetailPokemonAleatoire)

    const listPokemon = useSelector(selectListeMesFavoris)

    // Status du pokémon
    const state = useSelector(selectorStatusPokemonAleatoire)
    // dispatch
    const dispatch = useDispatch()

    // Fonction permettant de générer un nombre aléatoire
    function getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }

    // Limitation à 898 nombres car c'est le nombre de pokémon dans l'api
    const index = Math.round(getRandomArbitrary(1, 898))

    // Méthode appelé au lancement du fichier
    // Permet de retourner un pokémon aléatoire si aucun pokémon n'a été retourné
    useEffect(() => {
        if (state === 'rien'){
            dispatch(requetePokemonId(index))
        }
    })

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
        <div className={"card-pokemon-random"}>
            <div className={"col-sm-4"}>
                <img className={"card-pokemon-random-image"} src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" + pokemon.id + ".png"} alt={"pokemon"}/>
                <h2 className={"card-pokemon-random-nom"}>{pokemon.name}</h2>
                {verifFavoris()}
            </div>
            <div className={"col-sm-8"}>
                <p className={"card-pokemon-random-sous-titres"}> Statistiques :</p>
                <div className={"card-pokemon-random-div"}>
                    {pokemon.length !== 0
                        ?pokemon.stats.map(stat => (
                            <p className={"card-pokemon-random-texte-2"}><strong>{ stat.stat.name }</strong> : { stat.base_stat }</p>
                        ))
                        :''
                    }
                </div>
                <p className={"card-pokemon-random-sous-titres"}> Autres :</p>
                <div className={"card-pokemon-random-div"}>
                    <p className={"card-pokemon-random-texte"}><strong>hauteur</strong> : {pokemon.height}</p>
                    <p className={"card-pokemon-random-texte"}><strong>poids</strong> : {pokemon.weight}</p>
                </div>
                <p className={"card-pokemon-random-sous-titres"}> Type(s) :</p>
                <div className={"card-pokemon-random-div"}>
                    {pokemon.length !== 0
                        ?pokemon.types.map(type => (
                            <img className={"card-pokemon-random-image-type"} src={window.location.origin + '/types/' + type.type.name + '.png'} alt={"type"}/>
                        ))
                        :''
                    }
                </div>
            </div>
        </div>
    )

    return(
        <div>
            {state !== 'rien'
                ? affichageDetailPokemon
                : <Spinner/>
            }
        </div>
    );
}
