import React, { useEffect, useState } from 'react';
import {
  Button, Col, Dropdown, Menu, Radio, RadioChangeEvent, Row,
} from 'antd';
import { FilterOutlined } from '@ant-design/icons';
import { ConditionQueryType, SortQueryType } from '../../types/productType';

export interface IProductFilter {
  onApplyFilters: Function
}

function ProductFilter(props: IProductFilter): JSX.Element {
  const { onApplyFilters } = props;

  const [visible, setVisible] = useState<boolean>(false);
  const [apply, setApply] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<SortQueryType>(SortQueryType.TIME);
  const [cond, setCond] = useState<ConditionQueryType>(ConditionQueryType.HIGH_LOW);

  const sortOptions = [
    { label: 'Time', value: SortQueryType.TIME },
    { label: 'Price', value: SortQueryType.PRICE },
  ];

  const condOptions = [
    { label: 'High to Low', value: ConditionQueryType.HIGH_LOW },
    { label: 'Low to High', value: ConditionQueryType.LOW_HIGH },
  ];

  useEffect(() => {
    if (apply) {
      setVisible(false);
      setApply(false);
    }
  }, [apply]);

  const handleMenuClick = () => {
    setVisible(true);
  };

  const handleVisibleChange = (flag: boolean | ((prevState: boolean) => boolean)) => {
    setVisible(flag);
  };

  const handleSelectSortOption = (e: RadioChangeEvent) => {
    setSortBy(e.target.value);
  };

  const handleSelectCondOption = (e: RadioChangeEvent) => {
    setCond(e.target.value);
  };

  const handleApplyFilters = () => {
    setApply(true);
    onApplyFilters(sortBy, cond);
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="0">
        <Row gutter={32} align="middle">
          <Col span={6}>Sort by: </Col>
          <Col>
            <Radio.Group
              options={sortOptions}
              optionType="button"
              buttonStyle="solid"
              onChange={handleSelectSortOption}
              value={sortBy}
            />
          </Col>
        </Row>
      </Menu.Item>

      <Menu.Item key="1">
        <Row gutter={32} align="middle">
          <Col span={6}>Conditions: </Col>
          <Col>
            <Radio.Group
              options={condOptions}
              optionType="button"
              buttonStyle="solid"
              onChange={handleSelectCondOption}
              value={cond}
            />
          </Col>
        </Row>
      </Menu.Item>

      <Menu.Item key="2">
        <Row>
          <Col offset={6}>
            <Button
              className="mx-2"
              onClick={handleApplyFilters}
              type="primary"
            >
              Apply
            </Button>
          </Col>
        </Row>
      </Menu.Item>

    </Menu>
  );

  return (
    <>
      <Dropdown
        overlay={menu}
        visible={visible}
        onVisibleChange={handleVisibleChange}
        trigger={['click']}
      >
        <Button icon={<FilterOutlined />}>
          Filter
        </Button>
      </Dropdown>
    </>
  );
}

export default ProductFilter;
