// Importation des fonctions et composants nécessaires depuis React Testing Library
import { fireEvent, render, screen } from "@testing-library/react";
// Importation du composant Button et de la constante BUTTON_TYPES depuis le fichier index.js
import Button, { BUTTON_TYPES } from "./index";

// Déclaration d'une suite de tests pour le composant Button
describe("When a button is created", () => {

  // TEST 1.1 : VERIFIE SI LE BOUTON INCLUT UN TITRE

  it("the button must include a title", () => {
    // Rendu du composant Button avec un titre spécifique
    render(<Button title="my-button" type={BUTTON_TYPES.DEFAULT} />);
    // Recherche du bouton dans l'arbre du DOM par son titre
    const buttonElement = screen.getByTitle("my-button");
    // Vérification : le bouton est dans le document
    expect(buttonElement).toBeInTheDocument();
  });

  // TEST 1.2 : VERIFIE SI LE BOUTON AFFICHE UN LIBELE

  it("the button must display a label", () => {
    // Rendu du composant Button avec un libellé spécifique
    render(<Button>label</Button>);
    // Recherche du bouton dans l'arbre du DOM par son contenu texte
    const buttonElement = screen.getByText(/label/);
    // Vérification : le bouton est dans le document
    expect(buttonElement).toBeInTheDocument();
  });

  // Suite de tests pour les interactions avec le bouton
  describe("and it's clicked", () => {

    // TEST 2 : VERIFIE SI UN EVENEMENT "onClick" EST DECLANCHE LORS DU CLICK SUR LE BOUTON

    it("an event onClick it executed", () => {
      // Création d'une fonction fictive pour simuler un événement onClick
      const onClick = jest.fn();
      // Rendu du composant Button avec la fonction onClick simulée
      render(<Button onClick={onClick} />);
      // Recherche du bouton dans l'arbre du DOM par son attribut de test
      const buttonElement = screen.getByTestId("button-test-id");
      // Simulation d'un clic sur le bouton
      fireEvent(
        buttonElement,
        new MouseEvent("click", {
          bubbles: true,
          cancelable: true,
        })
      );
      // Vérification : la fonction onClick a été appelée
      expect(onClick.mock.calls.length).toBeGreaterThan(0);
    });
  });

  // Suite de tests pour les différents types de boutons
  describe("and selected type is submit", () => {

    // TEST 3 : VERIFIE SI UN BOUTON DE TYPE "submit" EST CREE

    it("an input submit is created", () => {
      // Rendu du composant Button avec le type "submit"
      render(<Button type={BUTTON_TYPES.SUBMIT}>label</Button>);
      // Recherche du bouton dans l'arbre du DOM par son attribut de test
      const buttonElement = screen.getByTestId("button-test-id");
      // Vérification : le type du bouton est "submit"
      expect(buttonElement.type).toEqual("submit");
    });
  });
});


// Dans ce code :

// -TEST 1 (1.1 et 1.2) : On teste si le bouton inclut un titre et affiche un libellé.
// -TEST 2 : On simule un clic sur le bouton et on vérifie si une fonction onClick est appelée.
// -TEST 3 : On teste si un bouton de type "submit" est créé lorsque le type sélectionné est "submit".
