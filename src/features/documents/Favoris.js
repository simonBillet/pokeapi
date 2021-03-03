import React from "react";
import {PokemonCardFavoris} from "./PokemonCardFavoris";
import {DetailPokemon} from "./DetailPokemon";

export const Favoris = () => {
    return(
        <div className="App container-fluid">
            <h1>Mes favoris</h1>
            <h2>Liste de mes favoris :</h2>
            <div className={"row"}>
                <div className={"col-sm-8"}>
                    <div className={"liste-pokemon"} role={"liste"}>
                        <PokemonCardFavoris/>
                    </div>
                </div>
                <div className={"col-sm-4"}>
                    <DetailPokemon/>
                </div>
            </div>
        </div>
    );
}
