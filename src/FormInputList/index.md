# FormInputList

## Usage

### Basic usage

```jsx
import { Form } from 'antd';
import { FormInputList } from 'antd-components-enhanced';

export default () => {
  return (
    <Form.Item label="domain list">
      <FormInputList placeholder="Please input domain" />
    </Form.Item>
  );
};
```

## Props

| prop        | description            | type     | required | defaultValue   |
| ----------- | ---------------------- | -------- | -------- | -------------- |
| placeholder | html input placeholder | `string` | no       | `Please input` |
