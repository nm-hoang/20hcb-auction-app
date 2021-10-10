import React, { ChangeEvent, useEffect } from 'react';
import { Input, Modal } from 'antd';

export interface IPlaceBidModal {
  isVisible: boolean
  onOk: Function
  onCancel: Function
  onPlaceBid: Function
}

function PlaceBidModal(props: IPlaceBidModal):JSX.Element {
  const {
    isVisible, onCancel, onOk, onPlaceBid,
  } = props;

  const inputRef = React.createRef<Input>();

  const handleOk = () => onOk;

  const handleCancel = () => onCancel;

  const handlePlaceBid = (e: ChangeEvent<HTMLInputElement>) => onPlaceBid(e.target.value);

  useEffect(() => {
    inputRef.current?.focus();
  });

  return (
    <>
      <Modal
        visible={isVisible}
        onCancel={() => handleCancel}
        onOk={() => handleOk}
        centered
        destroyOnClose
        keyboard
        closable={false}
      >
        <Input
          ref={inputRef}
          type="number"
          placeholder="Place your bid here"
          onChange={handlePlaceBid}
        />
      </Modal>
    </>
  );
}

export default PlaceBidModal;
