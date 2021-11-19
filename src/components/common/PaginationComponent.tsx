import React, { useState } from 'react';
import { Pagination } from 'antd';

export interface IPaginationComponentProps {
  onPageChange: Function
  total: number
}

function PaginationComponent(props: IPaginationComponentProps): JSX.Element {
  const { onPageChange, total } = props;

  const [currentPage, setCurrentPage] = useState<number>(1);

  const handlePageChange = (page: React.SetStateAction<number>) => {
    setCurrentPage(page);
    onPageChange(page);
  };

  return (
    <>
      <Pagination
        onChange={handlePageChange}
        current={currentPage}
        defaultCurrent={1}
        defaultPageSize={20}
        total={total}
      />
    </>
  );
}

export default PaginationComponent;
