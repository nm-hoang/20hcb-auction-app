import React from 'react';
import { Typography } from 'antd';

const { Text } = Typography;

function Element({ text, isSelected }: { text: string, isSelected: boolean }) {
  return (
    <>
      {isSelected
        ? (
          <>
            <Text className="txt-primary">
              {text}
              {isSelected}
            </Text>
            <div className="mt-1 mx-auto" style={{ width: '80%', background: '#1890FF', height: '1.5px' }} />
          </>
        )
        : (
          <Text>{text}</Text>
        )}
    </>
  );
}

export default Element;
