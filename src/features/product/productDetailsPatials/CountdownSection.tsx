import React from 'react';
import { Space, Tag, Typography } from 'antd';
import useCountdown from '../../../hooks/useCountdown';

export interface ICountdownSection {
  closeDate: number
}

const gray12 = '#141414';

function CountdownSection(props: ICountdownSection): JSX.Element {
  const { closeDate } = props;
  const [hours, minutes, seconds] = useCountdown(closeDate);

  return (
    <Space direction="vertical" size={6} align="end">
      <Typography.Text strong>Auction ends in</Typography.Text>
      <Space size={0}>
        <Tag className="rounded-4 px-1" color={gray12}>
          {hours}
        </Tag>
        <Tag className="rounded-4 px-1" color={gray12}>
          {minutes}
        </Tag>
        <Tag className="rounded-4 px-1 me-0" color={gray12}>
          {seconds}
        </Tag>
      </Space>
    </Space>
  );
}

export default CountdownSection;
