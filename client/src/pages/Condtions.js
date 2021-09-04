import React, { useState } from "react";
import Dropdown from "../components/PageAccueil/Dropdown";
import NavBar from "../components/PageAccueil/NavBar";

const Conditions = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <NavBar toggle={toggle} />
      <Dropdown isOpen={isOpen} toggle={toggle} />
      <div className="container" style={{ paddingTop: "60px" }}>
        <br />
        <h3>Conditions générales d'utlisations</h3>
        Les présentes conditions générales d’utilisation, qui sont susceptibles
        d’être modifiées de façon ponctuelle, s’appliquent à tous nos services,
        directement ou indirectement (fournis par nos distributeurs) en ligne,
        via des appareils mobiles, par e-mail ou par téléphone. En accédant à
        notre site Internet (mobile) ou à toute autre application via une
        plateforme (ci-après dénommés collectivement la « Plateforme »), et/ou
        en y effectuant une réservation, vous déclarez avoir pris connaissance
        des présentes conditions générales d’utilisation et de notre charte de
        confidentialité, en comprendre la portée et les accepter. Les présentes
        pages, leur contenu et leur infrastructure, ainsi que le service de
        réservation en ligne (y compris la facilitation du service de paiement)
        fournis par nous via le présent site Internet appartiennent à, sont
        gérés par et sont fournis par Booking.com B.V. Ils sont mis à votre
        disposition uniquement pour un usage personnel et non commercial (B2C),
        qui demeure soumis aux conditions générales d’utilisation établies
        ci-dessous. Notre relation avec les Fournisseurs de Voyage est régie par
        des conditions générales séparées qui régissent la relation commerciale
        (B2B) que nous avons avec chaque Fournisseur de Voyage. Tout Fournisseur
        de Voyage agit de façon professionnelle envers Booking.com lorsqu'il
        s'agit de rendre leur produit ou service disponible sur ou via
        Booking.com (à la fois dans le cadre de ses relations commerciales « B2B
        » et de ses relations non commerciales « B2C »). Veuillez noter que les
        Fournisseurs de Voyage peuvent détenir, déclarer applicables et
        nécessiter (l'acceptation de) leurs propres conditions générales (de
        prestation, d'expédition, de transport, d'utilisation) et règles de la
        maison pour l'utilisation, l'accès et la consommation du Voyage (qui
        pourrait comprendre certaines exclusions et limitations de
        responsabilité).
        <br />
        Les présentes conditions générales d’utilisation, qui sont susceptibles
        d’être modifiées de façon ponctuelle, s’appliquent à tous nos services,
        directement ou indirectement (fournis par nos distributeurs) en ligne,
        via des appareils mobiles, par e-mail ou par téléphone. En accédant à
        notre site Internet (mobile) ou à toute autre application via une
        plateforme (ci-après dénommés collectivement la « Plateforme »), et/ou
        en y effectuant une réservation, vous déclarez avoir pris connaissance
        des présentes conditions générales d’utilisation et de notre charte de
        confidentialité, en comprendre la portée et les accepter. Les présentes
        pages, leur contenu et leur infrastructure, ainsi que le service de
        réservation en ligne (y compris la facilitation du service de paiement)
        fournis par nous via le présent site Internet appartiennent à, sont
        gérés par et sont fournis par Booking.com B.V. Ils sont mis à votre
        disposition uniquement pour un usage personnel et non commercial (B2C),
        qui demeure soumis aux conditions générales d’utilisation établies
        ci-dessous. Notre relation avec les Fournisseurs de Voyage est régie par
        des conditions générales séparées qui régissent la relation commerciale
        (B2B) que nous avons avec chaque Fournisseur de Voyage. Tout Fournisseur
        de Voyage agit de façon professionnelle envers Booking.com lorsqu'il
        s'agit de rendre leur produit ou service disponible sur ou via
        Booking.com (à la fois dans le cadre de ses relations commerciales « B2B
        » et de ses relations non commerciales « B2C »). Veuillez noter que les
        Fournisseurs de Voyage peuvent détenir, déclarer applicables et
        nécessiter (l'acceptation de) leurs propres conditions générales (de
        prestation, d'expédition, de transport, d'utilisation) et règles de la
        maison pour l'utilisation, l'accès et la consommation du Voyage (qui
        pourrait comprendre certaines exclusions et limitations de
        responsabilité).
        <br />
        Les présentes conditions générales d’utilisation, qui sont susceptibles
        d’être modifiées de façon ponctuelle, s’appliquent à tous nos services,
        directement ou indirectement (fournis par nos distributeurs) en ligne,
        via des appareils mobiles, par e-mail ou par téléphone. En accédant à
        notre site Internet (mobile) ou à toute autre application via une
        plateforme (ci-après dénommés collectivement la « Plateforme »), et/ou
        en y effectuant une réservation, vous déclarez avoir pris connaissance
        des présentes conditions générales d’utilisation et de notre charte de
        confidentialité, en comprendre la portée et les accepter. Les présentes
        pages, leur contenu et leur infrastructure, ainsi que le service de
        réservation en ligne (y compris la facilitation du service de paiement)
        fournis par nous via le présent site Internet appartiennent à, sont
        gérés par et sont fournis par Booking.com B.V. Ils sont mis à votre
        disposition uniquement pour un usage personnel et non commercial (B2C),
        qui demeure soumis aux conditions générales d’utilisation établies
        ci-dessous. Notre relation avec les Fournisseurs de Voyage est régie par
        des conditions générales séparées qui régissent la relation commerciale
        (B2B) que nous avons avec chaque Fournisseur de Voyage. Tout Fournisseur
        de Voyage agit de façon professionnelle envers Booking.com lorsqu'il
        s'agit de rendre leur produit ou service disponible sur ou via
        Booking.com (à la fois dans le cadre de ses relations commerciales « B2B
        » et de ses relations non commerciales « B2C »). Veuillez noter que les
        Fournisseurs de Voyage peuvent détenir, déclarer applicables et
        nécessiter (l'acceptation de) leurs propres conditions générales (de
        prestation, d'expédition, de transport, d'utilisation) et règles de la
        maison pour l'utilisation, l'accès et la consommation du Voyage (qui
        pourrait comprendre certaines exclusions et limitations de
        responsabilité).
      </div>
    </>
  );
};

export default Conditions;
