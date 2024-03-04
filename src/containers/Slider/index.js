import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);

  const byDateDesc = data?.focus.sort((evtA, evtB) => // pour moi (sort = trier)
    new Date(evtB.date) < new Date(evtA.date) ? -1 : 1 // Inversion evtB < evtA pour afficher les événements du plus ancien au plus récent
  );

  useEffect(() => {
    // Deplacement de la logique de transition automatique (fonction 'nextCard')
    // Stocke l'identifiant du délai d'éxécution
    const timeOutId = setTimeout(() => {
      setIndex((prevIndex) => (prevIndex < (byDateDesc?.length ?? 0) - 1 ? prevIndex + 1 : 0));
    }, 5000);
    //  Je vérifie si l'index actuel est inférieur au nombre total d'événements -1. Si c'est le cas, je passe à l'événement suivant
    // (rajout de -1 pour éviter l'affichage d'une image blanche)
    return () => clearTimeout(timeOutId);
    // Nettoyage du timer lorsque l'index change

    // Effet déclenché par les changements de l'index et des données reçues
  }, [index, byDateDesc]);

  // Fonction pour changer manuellement l'indice en sélectionnant un input radio (utilisée plus bas)
  const handleChangeRadio = (radioIdx) => {
    // Mise à jour de l'index en fonction de l'indice de l'inputRadio
    setIndex(radioIdx);
    // Annulation du timer de transition automatique
    clearTimeout();
  };

  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        // Clé unique pour le titre
        <div key={event.title}>
          <div
            // Clé unique pour l'id de l'événement
            key={event.id}
            className={`SlideCard SlideCard--${index === idx ? "display" : "hide"
              }`}
          >
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
          <div className="SlideCard__paginationContainer">
            <div className="SlideCard__pagination">
              {byDateDesc.map((e, radioIdx) => (
                <input
                  key={`${e.title}`}
                  type="radio"
                  name="radio-button"
                  checked={radioIdx === index}
                  // Selection manuelle de l'input
                  onChange={() => handleChangeRadio(radioIdx)}
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Slider;
