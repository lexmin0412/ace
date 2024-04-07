import { InputNumber, Select } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';
import './index.less';

interface NumberAccuracyProps {
  style?: React.CSSProperties;
  value?: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
}

export default function NumberAccuracy(props: NumberAccuracyProps) {
  // @ts-ignore
  const { style, value: propsValue, onChange, max = 10 } = props;
  const [value, setValue] = useState<number | undefined>(0);

  useEffect(() => {
    setValue(propsValue);
  }, [propsValue]);

  const selectorValue = useMemo(() => {
    return !value || [0, 1, 2].includes(value) ? value : 'custom';
  }, [value]);

  const isCustom = useMemo(() => {
    return selectorValue === 'custom';
  }, [value]);

  const handleSelectChange = (value: 'custom' | number) => {
    const targetValue = value === 'custom' ? 3 : value;
    setValue(targetValue);
    onChange?.(targetValue);
  };

  const handleNumberChange = (number: number | null) => {
    setValue(number || 0);
    onChange?.(number || 0);
  };

  return (
    <div className="flex items-center" style={{ ...style }}>
      <Select
        className="flex-1"
        placeholder="请选择精确度"
        value={selectorValue}
        options={[
          {
            label: '整数',
            value: 0,
          },
          {
            label: '一位小数',
            value: 1,
          },
          {
            label: '两位小数',
            value: 2,
          },
          {
            label: '自定义',
            value: 'custom',
          },
        ]}
        onChange={handleSelectChange}
      />
      {isCustom ? (
        <div className="w-48 ml-4">
          <InputNumber
            value={value}
            min={3}
            max={max}
            addonAfter="位小数"
            onChange={handleNumberChange}
          />
        </div>
      ) : null}
    </div>
  );
}
