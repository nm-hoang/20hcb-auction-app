import React from 'react';
import {
  Avatar, Col, Row, Space, Typography,
} from 'antd';
import { AvatarSize } from 'antd/lib/avatar/SizeContext';

export interface IAvatarWithTextProps {
  src?: string
  text?: string | JSX.Element
  title?: string
  size?: AvatarSize
  strong?: boolean
}

function AvatarWithText(props: IAvatarWithTextProps): JSX.Element {
  const {
    src, text, title, size, strong,
  } = props;

  return (
    <>
      <Row gutter={[12, 12]} align="middle">
        <Col>
          <Avatar size={size} src={src} />
        </Col>
        <Col>
          <Space direction="vertical" size={0}>
            {!title || (
              <Typography.Text
                type="secondary"
                className="fs-caption"
              >
                {title}
              </Typography.Text>
            )}
            <Typography.Text strong={strong}>
              {text}
            </Typography.Text>
          </Space>
        </Col>
      </Row>
    </>
  );
}

export default AvatarWithText;
