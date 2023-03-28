import { markdownify } from "@lib/utils/textConverter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBookQuran,
  faMosque,
  faStarAndCrescent,
} from "@fortawesome/free-solid-svg-icons";
import React from "react";
import Modal from "./Modal";

const myIcons: any = {
  faBookQuran: faBookQuran,
  faMosque: faMosque,
  faStarAndCrescent: faStarAndCrescent,
};

const FeatureCard = ({ feature, theme }: any) => {
  const [showModal, setShowModal] = React.useState(false);
  const [modalId, setModalId] = React.useState<string | number>();

  const handleClick = (id: string | number) => {
    setShowModal(false);
    setModalId(id);
  };

  return (
    <div className="container">
      <div className="text-center">
        <h2>{markdownify(feature.title, "", "")}</h2>
      </div>
      <div className="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
        {feature.features.map((item: any, i: any) => (
          <div
            className="feature-card rounded-xl bg-white p-5 pb-8 text-center"
            key={`feature-${i}`}
          >
            {item.icon && (
              <FontAwesomeIcon
                icon={myIcons[item.icon]}
                style={{
                  fontSize: 80,
                  color: `${theme.colors.default.theme_color.primary}`,
                }}
              />
            )}
            <div className="mt-4">
              {markdownify(item.name, "h3", "h5")}
              <p className="mt-3">{item.content}</p>
              <a
                className="mt-3 font-medium hover:underline"
                style={{ color: `${theme.colors.default.theme_color.primary}` }}
                onClick={() => {
                  setShowModal(true);
                  setModalId(i);
                }}
              >
                Read more
              </a>
            </div>
            {showModal && modalId === i ? (
              <Modal
                title={item.name}
                body={item.readmore}
                handleClick={handleClick}
              />
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureCard;
