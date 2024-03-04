/**
 *
 */
/*
describe("Date helper", () => {
    describe("When getMonth is called", () => {
        it("the function return janvier for 2022-01-01 as date", () => {
            // to implement
        });
        it("the function return juillet for 2022-07-08 as date", () => {
            // to implement
        });
    });
})
*/



import { getMonth } from '../../helpers/Date';

describe("Date helper", () => { // Je décris un groupe de tests pour le helper de dates
    describe("When getMonth is called", () => { // Je décris un sous-groupe de tests pour la fonction getMonth
        it("I expect the function to return 'janvier' for the date '2022-01-01'", () => { // Je spécifie le comportement attendu de la fonction pour une date donnée
            const date = new Date(2022, 0, 1); // J'initialise une date au 1er janvier 2022
            const month = getMonth(date); // J'appelle la fonction getMonth avec cette date
            expect(month).toBe("janvier"); // Je vérifie si le mois renvoyé correspond à "janvier"
        });

        it("I expect the function to return 'juillet' for the date '2022-07-08'", () => { // Je spécifie le comportement attendu de la fonction pour une autre date
            const date = new Date(2022, 6, 8); // J'initialise une date au 8 juillet 2022
            const month = getMonth(date); // J'appelle la fonction getMonth avec cette date
            expect(month).toBe("juillet"); // Je vérifie si le mois renvoyé correspond à "juillet"
        });
    });
});


// Exemple de test unitaire pour bien comprendre :

/* const add = (nb1, nb2) => {
    return nb1 + nb2
}

describe('Test the function "add"', () => {
    it('test with two numbers', () => {
        const result = add(2, 3)
        expect(result).toBe(5)
    })
}) */
