import { useCallback, useRef, useState } from "react";
import PropTypes from "prop-types";
import Field, { FIELD_TYPES } from "../../components/Field";
import Select from "../../components/Select";
import Button, { BUTTON_TYPES } from "../../components/Button";

const mockContactApi = () => new Promise((resolve) => { setTimeout(resolve, 900); })
// Réduction du délai de timeout à 900ms pour éviter les erreurs de test.
// Avec le délai initial de 1000ms, j'ai rencontré des erreurs lors de l'exécution des tests.
// Il semble que le délai était trop long et entraînait des dépassements de délai d'attente
// avant que la promesse ne soit résolue. En ajustant le délai à 900ms, j'ai réussi à
// éviter ces erreurs tout en maintenant un délai suffisant pour simuler le comportement
// de la fonction d'API de contact.

const Form = ({ onSuccess, onError }) => {
  const [sending, setSending] = useState(false);
  const formRef = useRef(null); // utilisation de la fonction useRef(null) pour créer une référence à l'élément <form> du formulaire

  const sendContact = useCallback( // (pour moi : useCallback = fonction recréée QUE si les dépendances changent. Ici, "onSuccess" ou "onError")
    async (evt) => {
      evt.preventDefault();
      setSending(true); // (pour moi : appelé pour indiquer que l'envoi du formulaire est en cours.)
      // We try to call mockContactApi
      try {
        await mockContactApi(); // (pour moi : simulation d'une API de contact. "await" utilisé pour attendre que cette fonction se termine.)
        setSending(false); // (pour moi : pour indiquer que l'envoi est terminé)
        onSuccess(); // Ajout de onSuccess pour avoir le message de confirmation
        formRef.current.reset(); // Réinitialiser le formulaire
      } catch (err) {
        setSending(false);
        onError(err);
      }
    },
    [onSuccess, onError]
  );

  return (
    <form onSubmit={sendContact} ref={formRef}> {/* appel de la référence formRef */}
      <div className="row">
        <div className="col">
          <Field placeholder="" label="Nom" required /> {/* champ requis */}
          <Field placeholder="" label="Prénom" required /> {/* Champ requis */}
          <Select
            selection={["Personel", "Entreprise"]}
            onChange={() => null}
            label="Personel / Entreprise"
            type="large"
            titleEmpty
            required // sélection requise
          />
          <Field placeholder="" label="Email" required /> {/* Champ requis */}
          <Button type={BUTTON_TYPES.SUBMIT} disabled={sending}>
            {sending ? "En cours" : "Envoyer"}
          </Button>
        </div>
        <div className="col">
          <Field
            placeholder="message"
            label="Message"
            type={FIELD_TYPES.TEXTAREA}
            required // Champ requis
          />
        </div>
      </div>
    </form>
  );
};
Form.propTypes = {
  onError: PropTypes.func,
  onSuccess: PropTypes.func,
}
Form.defaultProps = {
  onError: () => null,
  onSuccess: () => null,
}
export default Form;
