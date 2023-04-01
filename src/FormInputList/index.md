# 批量录入

## 用法

### 基本使用

```jsx
import { Form } from 'antd';
import { FormInputList } from 'antd-components-enhanced';

export default () => {
  return (
    <Form.Item label="域名列表">
      <FormInputList placeholder="请输入域名" />
    </Form.Item>
  );
};
```

## 属性

| prop        | 描述       | 类型     | 必填 | 默认值   |
| ----------- | ---------- | -------- | ---- | -------- |
| placeholder | 输入框提示 | `string` | 否   | `请输入` |
