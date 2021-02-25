import React, {useEffect} from "react";
import {DetailPokemon} from "./DetailPokemon";
import types from "../../types.json";
import {Spinner} from "./Spinner";
import {PokemonCardType} from "./PokemonCardType";
import {useDispatch, useSelector} from "react-redux";
import {
    requetePokemonType,
    selectorStatusListeType,
    selectPokemonListeType,
} from "./pokemonsSlice";

export const PokemonType = () => {
    // Récupération de la liste des pokémons
    const pokemons = useSelector(selectPokemonListeType)

    // dispatch
    const dispatch = useDispatch()
    // statut de la requête
    const status = useSelector(selectorStatusListeType)

    // Permet de retourner une liste de pokémons si aucune liste n'a été retourné
    useEffect( () => {
        if (status === 'rien'){
            dispatch(requetePokemonType(1))
        }
    })

    // Permet de changer le type des pokémons que l'on souhaite voir
    const changertype = (id) => {
        dispatch(requetePokemonType(id))
    }

    // Permet de retourne l'images des types des pokémons
    // Si c'est le type sélectionné par l'utilsiateur alors il prendra une classe avec de l'opacity
    const imageDesTypes = (type) => {
        if(pokemons.name === type.name){
            return(<img onClick={() => changertype(type.id)} className={"liste-type-pokemon-image opacity"} src={window.location.origin + '/types/' + type.name + '.png'}/>)
        } else {
            return(<img onClick={() => changertype(type.id)} className={"liste-type-pokemon-image"} src={window.location.origin + '/types/' + type.name + '.png'}/>)
        }
    }

    return(
        <div className="App container-fluid">
            <h1>Pokémon par type</h1>
            <h2>Les différents types :</h2>
            <div className={"liste-type-pokemon"}>
                {types.map(type => (
                    imageDesTypes(type)
                ))
                }
            </div>

            <div className={"row"}>
                <div className={"col-sm-8"}>
                    <h2>Liste selon le type sélectionné :</h2>
                    {pokemons.length !== 0
                        ?
                        <div className={"liste-pokemon"}>
                            {status === 'succès' ?<PokemonCardType/> :<Spinner/>}
                        </div>
                        :<div></div>
                    }
                </div>

                <div className={"col-sm-4"}>
                    <DetailPokemon />
                </div>
            </div>
        </div>
    );
}
