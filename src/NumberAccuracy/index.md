# NumberAccuracy

## Usage

### Basic Usage

```jsx
import { NumberAccuracy } from '@lexmin0412/ace';

export default () => {
  return <NumberAccuracy />;
};
```

### Custom Container Style

```jsx
import { NumberAccuracy } from '@lexmin0412/ace';

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
import { NumberAccuracy } from '@lexmin0412/ace';

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
