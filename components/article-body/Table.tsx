import React from 'react';

interface TableProps {
  children: React.ReactNode | string;
}

const Table = ({ children }: TableProps) => {
  return <table className="table-auto border-separate border-2 ">{children}</table>;
};

export default Table;
