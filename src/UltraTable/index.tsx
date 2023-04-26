/**
 * ultra table
 */
import { usePagination } from 'ahooks';
import { Table, TableProps } from 'antd';
import { ColumnsType } from 'antd/lib/table';
import React, { useEffect, useState } from 'react';

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 10;
const ROW_KEY = 'id';

interface UltraTableProps extends TableProps<unknown> {
  columns: ColumnsType<any>;
  request: (params: unknown) => Promise<{
    list: any[];
    total: number;
  }>;
  rowKey?: string;
  refreshDeps?: unknown[];
  renderTotal?: (total: number) => JSX.Element;
}

/**
 * ultra table hook 提供一些 UltraTable 配套的功能
 */
export const useUltraTable = () => {
  const [refreshKey, setRefreshKey] = useState(0);
  return {
    refreshKey,
    dispatchRefresh: () => setRefreshKey(refreshKey + 1),
  };
};

export default function UltraTable(props: UltraTableProps) {
  const {
    columns,
    rowKey = ROW_KEY,
    request,
    refreshDeps,
    renderTotal,
  } = props;

  const { data, runAsync, pagination, loading } = usePagination(
    (params) => {
      console.log('enter ultra table request', params);
      return request(params);
    },
    {
      defaultPageSize: DEFAULT_PAGE_SIZE,
      refreshDeps,
      onSuccess: (res) => {
        console.log('ultra table request success', res);
      },
      onError: (err) => {
        console.log('ultra table request error', err);
      },
    },
  );

  useEffect(() => {
    runAsync({
      current: DEFAULT_PAGE,
      pageSize: DEFAULT_PAGE_SIZE,
    });
  }, []);

  return data?.list ? (
    <Table
      className="ultra-table"
      columns={columns}
      dataSource={data.list}
      rowKey={rowKey}
      pagination={{
        current: pagination.current,
        pageSize: pagination.pageSize,
        showSizeChanger: true,
        total: pagination.total,
        showTotal: renderTotal ? renderTotal : (total) => `共 ${total} 条`,
        onChange: pagination.onChange,
      }}
      loading={loading}
    />
  ) : null;
}
