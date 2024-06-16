import { Modal } from "@/components";

import { ICONS } from "@/constants";

import Pets from "@/assets/images/Pets.webp";

import "./AssistanceAnimals.scss";

type SupportProp = {
  activeModal: boolean;
  setActiveModal: (value: boolean) => void;
};

export const AssistanceAnimals: React.FC<SupportProp> = ({
  activeModal,
  setActiveModal,
}: SupportProp) => {
  return (
    <Modal active={activeModal} setActive={setActiveModal} maxDivWidth="800px">
      <div className="assistance-animals">
        {ICONS.menuClose({ onClick: () => setActiveModal(false) })}
        <img src={Pets} alt="pets" className="assistance-animals__img" loading="lazy" />
        <div className="assistance-animals__text">
          <div className="assistance-animals__title">Assistance animals</div>
          <div className="assistance-animals__subtitle">
            We endeavour to provide comfortable accommodation for all our clients, including those
            who require assistance animals. We are pleased to advise that when booking, assistance
            animals are not considered pets and there is no additional charge for them.
          </div>
        </div>
      </div>
    </Modal>
  );
};
