/**
 * 批量录入组件，可用于数组形式字段的批量录入，如微信第三方域名配置
 */

import { Form, Input } from 'antd';
import _ from 'lodash';
import React, { useMemo, useState } from 'react';

import IconAdd from './icon-add';

import styles from './index.module.less';

interface FormInputListProps {
  placeholder?: string;
  value?: string[];
  onChange?: (value: string[]) => void;
}

export default function FormInputList(props: FormInputListProps) {
  const { placeholder = '请输入', value, onChange } = props;
  const [valueList, setValueList] = useState<string[]>(['']);

  const value4Render = useMemo(() => {
    return value || valueList;
  }, [value, valueList]);

  const handleAddItem = () => {
    const newList = (value4Render || []).concat(['']);
    setValueList(newList);
    onChange?.(newList);
  };

  console.log('value4Render', value4Render);

  const handleFieldChange = (e: any, index: number) => {
    const newValues = _.cloneDeep(value4Render);
    newValues[index] = e.target.value;
    setValueList(newValues);
    onChange?.(newValues);
  };

  const handleSubstractItem = (index: number) => {
    const newValues = _.cloneDeep(value4Render);
    newValues.splice(index, 1);
    setValueList(newValues);
    onChange?.(newValues);
  };

  return (
    <>
      <div className={styles['form-item-container']}>
        <Form.Item noStyle>
          <Input
            type="text"
            className={styles['form-item-input']}
            placeholder={placeholder}
            value={value4Render?.[0]}
            onChange={(e) => handleFieldChange(e, 0)}
          />
        </Form.Item>
      </div>
      {value4Render?.map((item, index) => {
        if (index === 0) {
          return null;
        }
        return (
          <div className={styles['form-item-container']} key={index}>
            <Form.Item colon={false} noStyle>
              <Input
                value={item}
                type="text"
                className={styles['form-item-input']}
                placeholder={placeholder}
                onChange={(e) => handleFieldChange(e, index)}
              />
            </Form.Item>
            <div className={styles['suffix']}>
              <div className={styles['divider']}></div>
              <div
                onClick={() => handleSubstractItem(index)}
                className={styles['substract-button']}
              >
                -
              </div>
            </div>
          </div>
        );
      })}
      <div
        onClick={handleAddItem}
        className={`${styles['form-item-container']} ${styles['border-0']}`}
      >
        <div className={styles['form-item-add']}>
          <IconAdd />
          <span>添加</span>
        </div>
      </div>
    </>
  );
}
