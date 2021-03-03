import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {DetailPokemon} from "./DetailPokemon";
import {PokemonCard} from "./PokemonCard";
import {Spinner} from "./Spinner";
import {
    requeteIndex,
    selectorStatus,
    selectPokemonsListe,
} from "./pokemonsSlice";

export const PokeListe = () => {
    // Récupération des pokémons
    const pokemons = useSelector(selectPokemonsListe)

    // Numéro de la page, ne fonctionne pas vraiment
    let numeroPage = 1

    // dispatch
    const dispatch = useDispatch()
    // statut de la requête
    const status = useSelector(selectorStatus)

    // Permet de retourner une liste de pokémons si aucune liste n'a été retourné
    useEffect( () => {
        if (status === 'inactif'){
            dispatch(requeteIndex('https://pokeapi.co/api/v2/pokemon?offset=0&limit=20'))
        }
    })

    // Permet de passer à la liste de pokémon suivante à celle d'afficher actuellement
    const pageSuivante = () => {
        dispatch(requeteIndex(pokemons.next))

    }

    // Permet de passer à la liste de pokémon précédente à celle d'afficher actuellement
    const pagePrecedente = () => {
        dispatch(requeteIndex(pokemons.previous))
    }

    return(
        <div className="App container-fluid">
            <h1>Poké liste</h1>
            <h2>Liste des pokémons :</h2>
            <div className={"row"}>
                <div className={"col-sm-8"}>
                    <div className={"bouton-nav-liste-pokemon"}>
                        <button onClick={pagePrecedente} className={"bouton-changer-page"}>Précédent</button>
                        <p className={"numero-page"}>{numeroPage}</p>
                        <button onClick={pageSuivante} className={"bouton-changer-page"}>Suivant</button>
                    </div>
                    {pokemons.length !== 0
                        ?
                        <div className={"liste-pokemon"} role={"liste"}>
                            {status === 'succès' ?<PokemonCard/> :<Spinner/>}
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

