# TurboSelect

## Usage

### Single Select

```jsx
import { TurboSelect } from 'antd-components-enhanced';

const options = [
  {
    label: 'Option 1',
    value: '1',
  },
  {
    label: 'Option 2',
    value: '2',
  },
];

export default () => {
  return (
    <TurboSelect
      style={{
        width: '160px',
      }}
      options={options}
      placeholder="请选择"
    />
  );
};
```

### Multi Select

```jsx
import { TurboSelect } from 'antd-components-enhanced';

const options = [
  {
    label: 'Option 1',
    value: '1',
  },
  {
    label: 'Option 2',
    value: '2',
  },
];

export default () => {
  return (
    <TurboSelect
      style={{
        width: '160px',
      }}
      mode="multiple"
      options={options}
      placeholder="请选择"
    />
  );
};
```
