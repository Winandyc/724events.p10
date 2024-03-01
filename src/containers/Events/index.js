import { useState } from "react";
import EventCard from "../../components/EventCard";
import Select from "../../components/Select";
import { useData } from "../../contexts/DataContext";
import Modal from "../Modal";
import ModalEvent from "../ModalEvent";

import "./style.css";

const PER_PAGE = 9;

const EventList = () => {
  const { data, error } = useData(); // DATA = événements // ERROR = erreurs survenues lors de la récupération des données
  const [type, setType] = useState(); // "useState" pour créer un état TYPE (ici, undefinied car ()) et une fonction "setType" pour le mettre à jour
  const [currentPage, setCurrentPage] = useState(1); // pour la pagination (= contenu divisé en plusieurs pages)
  const filteredEvents = (
    (!type // condition ternaire (= permet d'écrire une expression conditionnelle de manière concise) qui vérifie si TYPE est défini
      ? data?.events // si TYPE n'est pas défini (undefined ou null), tous les éléments sont retournés sans aucun filtrage.
      : data?.events.filter((event) => event.type === type)) || [] // si TYPE est défini, les événements sont filtrés pour ne retourner que ceux dont le type correspond à la valeur de TYPE.
    // l'opérateur || [] est utilisé pour s'assurer qu'en cas de valeur "nulle" ou "undefined", un tableau vide est retourné plutôt qu'une valeur null ou undefined. Cela garantit que filteredEvents soit toujours un tableau, même s'il n'y a pas d'événements à retourner.
  ).filter((_, index) => { // je filtre les événements selon leur index dans le tableau (_ = "event" est déclaré mais n'est jamais lue).
    const startIndex = (currentPage - 1) * PER_PAGE; // indice de départ // calcul de l'indice de départ de la plage d'événements à afficher sur la page actuelle.
    const endIndex = PER_PAGE * currentPage; // indice de fin.
    const isWithinPageRange = startIndex <= index && index < endIndex; // vérifie si l'indice de l'événement est dans la plage à afficher sur la page actuelle en utilisant les indices de début et de fin calculés précédemment.
    return isWithinPageRange; // retourne true si l'événement se trouve dans la plage à afficher sur la page actuelle, sinon elle retourne false.
  });
  const changeType = (evtType) => {
    setCurrentPage(1);
    setType(evtType);
  };
  const pageNumber = Math.floor((filteredEvents?.length || 0) / PER_PAGE) + 1;
  const typeList = new Set(data?.events.map((event) => event.type));
  return (
    <>
      {error && <div>An error occured</div>}
      {data === null ? (
        "loading"
      ) : (
        <>
          <h3 className="SelectTitle">Catégories</h3>
          <Select
            selection={Array.from(typeList)}
            onChange={(value) => (value !== null ? changeType(value) : changeType(null))}
          />
          <div id="events" className="ListContainer">
            {filteredEvents.map((event) => (
              <Modal key={event.id} Content={<ModalEvent event={event} />}>
                {({ setIsOpened }) => (
                  <EventCard
                    onClick={() => setIsOpened(true)}
                    imageSrc={event.cover}
                    title={event.title}
                    date={new Date(event.date)}
                    label={event.type}
                  />
                )}
              </Modal>
            ))}
          </div>
          <div className="Pagination" >
            {[...Array(pageNumber || 0)].map((_, n) => (
              // eslint-disable-next-line react/no-array-index-key
              <a key={n} href="#events" onClick={() => setCurrentPage(n + 1)}>
                {n + 1}
              </a>
            ))}
          </div>
        </>
      )}
    </>
  );
};
export default EventList;
