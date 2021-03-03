import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import {client} from "../../api/client";

// Etat par défaut du Slice
export const initialState = {
    resultats: [],
    status: 'inactif',
    statusPokemonCible: 'rien',
    detailPokemonCible: '',
    statusPokemonAleatoire: 'rien',
    detailPokemonAleatoire: '',
    statusListeType: 'rien',
    listePokemonType: [],
    listeMesFavoris: []
}

// Recherche d'une liste de pokémon
export const requeteIndex = createAsyncThunk('pokemons/resultats',
    async query => {
        const reponse = await client.get(query)
        return reponse
    })

// Recherche d'un pokémon par son nom
export const requeteDetailPokemon = createAsyncThunk('pokemons/detailPokemonCible',
    async requete => {
        const reponse = await client.get('https://pokeapi.co/api/v2/pokemon/' + requete)
        return reponse
    })

// Recherche d'un pokémon par son id
export const requetePokemonId = createAsyncThunk('pokemons/detailPokemonAleatoire',
    async requete => {
        const reponse = await client.get('https://pokeapi.co/api/v2/pokemon/' + requete)
        return reponse
    })

// recherche d'une liste de pokemon en fonction de leurs types
export const requetePokemonType = createAsyncThunk('pokemons/listePokemonType',
    async requete => {
        const reponse = await client.get('https://pokeapi.co/api/v2/type/' + requete);
        return reponse
    })


const pokemonSlice = createSlice({
    name: 'pokemons',
    initialState,
    reducers: {
        pokemonNumeroRequete(state, action){
            state.status = action.payload.status
        },
        pokemonDetailCible(state, action){
            state.statusPokemonCible = action.payload.statusPokemonCible
        },
        pokemonDetailAleatoire(state, action){
            state.statusPokemonAleatoire = action.payload.statusPokemonAleatoire
        },
        pokemonDetailType(state, action){
            state.statusListeType = action.payload.statusListeType
        },
        ajouterPokemonMesFavoris(state, pokemon){
            state.listeMesFavoris.push(pokemon.payload)
        },
        supprimerPokemonMesFavoris(state, pokemon){
            console.log(state.listeMesFavoris)
            state.listeMesFavoris.filter(item => {
                console.log('début')
                console.log(item)
                console.log(pokemon)
                return item.id !== pokemon.id
            })
        }
    },
    extraReducers: {
        [requeteIndex.pending]: (state) => {
            state.status = 'en cours'
        },
        [requeteIndex.fulfilled]: (state, action) => {
            state.status = 'succès'
            state.resultats = action.payload
        },
        [requeteDetailPokemon.fulfilled]: (state, action) => {
            state.statusPokemonCible = 'succès'
            state.detailPokemonCible = action.payload
        },
        [requetePokemonId.fulfilled]: (state, action) => {
            state.statusPokemonAleatoire = 'succès'
            state.detailPokemonAleatoire = action.payload
        },
        [requetePokemonType.fulfilled]: (state, action) => {
            state.statusListeType = 'succès'
            state.listePokemonType = action.payload
        }
    }
})

export const selectPokemonsListe = state => state.pokemons.resultats

export const selectorStatus = state => state.pokemons.status

export const selectDetailPokemonCible = state => state.pokemons.detailPokemonCible

export const selectorStatusPokemonCible = state => state.pokemons.statusPokemonCible

export const selectDetailPokemonAleatoire = state => state.pokemons.detailPokemonAleatoire

export const selectorStatusPokemonAleatoire = state => state.pokemons.statusPokemonAleatoire

export const selectPokemonListeType = state => state.pokemons.listePokemonType

export const selectorStatusListeType = state => state.pokemons.statusListeType

export const selectListeMesFavoris = state => state.pokemons.listeMesFavoris

export const { pokemonNumeroRequete, pokemonDetailCible, pokemonDetailAleatoire, pokemonDetailType, ajouterPokemonMesFavoris, supprimerPokemonMesFavoris } = pokemonSlice.actions

export default pokemonSlice.reducer
