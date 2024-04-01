# ColorPicker

## Usage

### Basic Usage

```tsx
import { ColorPicker } from '@lexmin0412/ace';
import { Button } from 'antd';
import { useState } from 'react';

export default () => {
  const [color, setColor] = useState('#000');

  const handleChange = (value: string) => {
    setColor(value);
  };

  return (
    <>
      <ColorPicker value={color} onChange={handleChange}>
        <Button
          style={{ color: color, borderColor: color, marginRight: '20px' }}
        >
          Pick Color
        </Button>
      </ColorPicker>
      <span style={{ color: color }}>currentColor: {color}</span>
    </>
  );
};
```

### Custom current label

```tsx
import { ColorPicker } from '@lexmin0412/ace';
import { Button } from 'antd';
import { useState } from 'react';

export default () => {
  const [color, setColor] = useState('#000');

  const handleChange = (value: string) => {
    setColor(value);
  };

  return (
    <>
      <ColorPicker
        labelForSelected="Using"
        value={color}
        onChange={handleChange}
      >
        <Button
          style={{ color: color, borderColor: color, marginRight: '20px' }}
        >
          Pick Color
        </Button>
      </ColorPicker>
      <span style={{ color: color }}>currentColor: {color}</span>
    </>
  );
};
```

## Props

| prop             | description                     | type                      | required | defaultValue |
| ---------------- | ------------------------------- | ------------------------- | -------- | ------------ |
| labelForSelected | label for current picked color  | `string`                  | no       | `Selected`   |
| value            | current value                   | `string`                  | no       | -            |
| onChange         | callback when color picked      | `(color: string) => void` | no       | -            |
| children         | content to trigger color picker | `JSX.Element`             | no       | -            |
