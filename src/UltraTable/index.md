# UltraTable

## Usage

### Basic usage

```jsx
import { TableColumnType } from 'antd'
import { UltraTable } from '@lexmin0412/ace';

interface DataType {
  id: number
  name: string
}

const genList = (current, pageSize) => {
  let list = []
  for ( var i = 0; i < pageSize; i++) {
    const fakeId = (current-1)*pageSize + i + 1
    list.push({
      id: fakeId,
      name: `No. ${fakeId}`
    })
  }
  return list
}

export default () => {

  const columns: TableColumnType<fieldFieldItem>[] = [
    {
      title: "ID",
      width: 80,
      dataIndex: 'id',
    },
    {
      title: "name",
      dataIndex: "name",
      width: 80,
    },
  ]

  const fakeFetch = (params: {
    current: number,
    pageSize: number
  }) => {
    const { current, pageSize } = params
    return new Promise((resolve, reject) => {
      setTimeout(()=>{
        resolve({
          list: genList(current, pageSize),
          total: 100
        })
      }, 1000)
    })
  }

  return (
    <UltraTable
      columns={columns}
      request={fakeFetch}
    />
  );
};
```

### Dispatch Request Manually

```tsx
import { UltraTable, useUltraTable } from '@lexmin0412/ace';
import { Button, TableColumnType } from 'antd';

interface DataType {
  id: number;
  name: string;
}

const genList = (current, pageSize) => {
  let list = [];
  for (var i = 0; i < pageSize; i++) {
    const fakeId = (current - 1) * pageSize + i + 1;
    list.push({
      id: fakeId,
      name: `No. ${fakeId}`,
    });
  }
  return list;
};

export default () => {
  const { refreshKey, dispatchRefresh } = useUltraTable();

  const columns: TableColumnType<fieldFieldItem>[] = [
    {
      title: 'ID',
      width: 80,
      dataIndex: 'id',
    },
    {
      title: 'name',
      dataIndex: 'name',
      width: 80,
    },
  ];

  const fakeFetch = (params: { current: number; pageSize: number }) => {
    const { current, pageSize } = params;
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve({
          list: genList(current, pageSize),
          total: 100,
        });
      }, 1000);
    });
  };

  return (
    <>
      <Button
        onClick={dispatchRefresh}
        style={{
          marginBottom: '20px',
        }}
      >
        Refresh
      </Button>
      <UltraTable
        columns={columns}
        request={fakeFetch}
        refreshDeps={[refreshKey]}
      />
    </>
  );
};
```

## Props

| prop        | description                      | type                                                       | required | defaultValue |
| ----------- | -------------------------------- | ---------------------------------------------------------- | -------- | ------------ |
| columns     | table column config              | `ColumnsType<any>`                                         | yes      | -            |
| request     | request method for fetching data | `(params: unknown) =>Promise<{list: any[];total: number;}` | yes      | -            |
| renderTotal | total text render function       | `renderTotal?: (total: number) => JSX.Element;`            | no       | -            |
