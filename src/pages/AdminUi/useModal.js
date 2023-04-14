import { useState } from 'react';

export const useModal = () => {
  const [visible, setVisible] = useState(false);
  const [modalProps, setModalProps] = useState({});

  const openModal = (props) => {
    setModalProps(props);
    setVisible(true);
  };

  const closeModal = () => {
    setVisible(false);
  };

  return { visible, modalProps, openModal, closeModal };
};
