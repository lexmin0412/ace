# NumberAccuracy

## Usage

### Basic Usage

```jsx
import { NumberAccuracy } from 'antd-components-enhanced';

export default () => {
  return <NumberAccuracy />;
};
```

### Custom Container Style

```jsx
import { NumberAccuracy } from 'antd-components-enhanced';

export default () => {
  return (
    <NumberAccuracy
      style={{
        width: '400px',
      }}
    />
  );
};
```

### Custom Max Limit

```jsx
import { NumberAccuracy } from 'antd-components-enhanced';

export default () => {
  return (
    <NumberAccuracy
      style={{
        width: '400px',
      }}
      max={20}
    />
  );
};
```
