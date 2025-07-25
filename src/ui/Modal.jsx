/* eslint-disable react/prop-types */
import { cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import styled from "styled-components";
import useHandleOutsideClick from "../hooks/useHandleOutsideClick";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
  max-height: 80vh;
  overflow-y: auto;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;

const ModalContext = createContext();

function Modal({ children }) {
  const [modalName, setModalName] = useState("");
  const close = () => setModalName("");
  const open = setModalName;
  return (
    <ModalContext.Provider value={{ modalName, close, open }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children, opens: openWindowName }) {
  const { open } = useContext(ModalContext);
  const oldOnClick = children.props.onClick;
  return cloneElement(children, {
    onClick: (e) => {
      if (oldOnClick) oldOnClick(e);
      open(openWindowName);
    },
  });
}

function Window({ children, name }) {
  const { close, modalName } = useContext(ModalContext);

  const { ref } = useHandleOutsideClick(close);

  if (name !== modalName) return null;
  return (
    <Overlay>
      <StyledModal ref={ref}>
        <Button onClick={() => close()}>
          <HiXMark />
        </Button>
        {cloneElement(children, { onCloseModal: () => close() })}
      </StyledModal>
    </Overlay>
  );
}

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
