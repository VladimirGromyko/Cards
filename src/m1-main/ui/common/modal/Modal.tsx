import React, { CSSProperties, ReactNode } from "react";

interface IModal {
  enableBackground?: boolean;
  backgroundStyle?: CSSProperties;
  backgroundOnClick?: () => void;

  width: number;
  height: number;
  modalStyle?: CSSProperties;
  // modalOnClick?: () => void;

  show: boolean;
  children: ReactNode;
}

const Modal: React.FC<IModal> = ({
  enableBackground,
  backgroundStyle,
  backgroundOnClick = () => {},

  width,
  height,
  modalStyle,
  // modalOnClick = () => {
  // },

  show,
  children,
}) => {
  const top = `calc(50vh - ${height / 2}px)`;
  const left = `calc(50vw - ${width / 2}px)`;
  if (!show) return null;

  return (
    <>
      {enableBackground && (
        <div
          style={{
            position: "fixed",
            top: "0px",
            left: "0px",
            width: "100vw",
            height: "100vh",

            background: "black",
            opacity: 0.35,
            zIndex: 20,

            ...backgroundStyle,
          }}
          onClick={backgroundOnClick}
        />
      )}
      <div
        style={{
          position: "fixed",
          top,
          left,
          width: modalStyle?.width ? modalStyle.width : width,
          height: modalStyle?.height ? modalStyle.height : height,
          display: "flex",
          flexFlow: "column",
          // justifyContent: 'center',

          background: modalStyle?.backgroundColor
            ? modalStyle.backgroundColor
            : "lime",
          zIndex: 21,

          ...modalStyle,
        }}
        // onClick={modalOnClick}
      >
        {children}
      </div>
    </>
  );
};

export default Modal;
