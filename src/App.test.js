import React from 'react';
import reducer, {
    initialState,
} from './features/Service/pokemonsSlice';
import {render, screen} from '@testing-library/react';
import { Provider } from 'react-redux';
import store from './app/store';
import {Accueil} from "./features/Accueil/Accueil";
import App from "./App";
import {PokemonRandom} from "./features/Accueil/PokemonRandom";
import userEvent from "@testing-library/user-event";
import {PokeListe} from "./features/PokeListe/PokeListe";
import {PokemonType} from "./features/PokemonParType/PokemonType";
import {Favoris} from "./features/MesFavoris/Favoris";

describe('Tests sur la page d accueil', () => {
    test('Vérif. sur l initial state', () => {
        const initState = initialState;
        const restState = reducer(undefined, {});
        expect(restState).toEqual(initState);
    });

    test('Vérification que le mot Accueil apparait sur la page d accueil', () => {
        const {getByText} = render(
            <Provider store={store}>
                <Accueil/>
            </Provider>
        );

        // explicit assertion
        expect(getByText(/Accueil/i)).toBeInTheDocument();
    });

    // Vérifier sur le component le plus petit (permet de trouver l'erreur le plus rapidement si il y en a)
    test('Vérification que le pokémon aléatoire s affiche suite au chargement des données', async () => {
        render(<Provider store={store}>
            <PokemonRandom/>
        </Provider>);

        expect(screen.queryByText(/hp/)).toBeNull();

        expect(await screen.findByText(/hp/)).toBeInTheDocument();
    });

    test('Vérification que le pokémon a été ajouté à Mes Favoris', async () => {
        render(<Provider store={store}>
            <PokemonRandom/>
        </Provider>);

        await userEvent.click(screen.queryByText('Ajouter à mes favoris'));

        const estAjouter = await screen.queryByText('Supprimer de mes favoris');

        expect(estAjouter).toBeTruthy();
    });
});

describe('Tests sur la page poke liste', () => {
    test('Vérification que le mot Poké liste soit bien affiché sur la page Poké liste', () => {
        const {getByText} = render(
            <Provider store={store}>
                <PokeListe/>
            </Provider>
        );

        expect(getByText(/Poké liste/i)).toBeInTheDocument();
    });

    test('Vérification que la liste des pokémons s affiche suite au chargement des données dans la page Poké liste', async () => {
        render(<Provider store={store}>
            <PokeListe/>
        </Provider>);

        expect(screen.queryByAltText('pokemon')).toBeNull();

        const pokemon = await screen.findAllByAltText('pokemon');

        expect(pokemon[0]).toBeInTheDocument();
    });
});

describe('Tests sur la page type pokémon', () => {
    test('Vérification que les mots Pokémon par type soient bien affichés sur la page Pokémon par type', () => {
        const {getByText} = render(
            <Provider store={store}>
                <PokemonType/>
            </Provider>
        );

        expect(getByText(/Pokémon par type/i)).toBeInTheDocument();
    })

    test('Vérification que la liste des pokémons s affiche suite au chargement des données dans la page Pokémon par type', async () => {
        render(<Provider store={store}>
            <PokemonType/>
        </Provider>);

        expect(screen.queryByAltText('pokemon')).toBeNull();

        const pokemon = await screen.findAllByAltText('pokemon');

        expect(pokemon[0]).toBeInTheDocument();
    });
});

describe('Tests page mes favoris', () => {
    test('Vérification que les mots Mes favoris soient bien affiché sur la page Mes favoris', () => {
        const { queryAllByText } = render(
            <Provider store={store}>
                <Favoris />
            </Provider>
        );

        expect(queryAllByText(/Mes favoris/i)).toBeTruthy();
    });
});
