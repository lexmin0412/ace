/**
 * 批量录入组件，可用于数组形式字段的批量录入，如微信第三方域名配置
 */

import { Form, Input } from "antd";
import React, { type JSX, useMemo, useState } from "react";

import IconAdd from "./icon-add";

import "./index.css";

const cloneDeep = (data: any) => JSON.parse(JSON.stringify(data))

interface FormInputListProps {
  addIcon?: JSX.Element;
  removeIcon?: JSX.Element;
  placeholder?: string;
  value?: string[];
  onChange?: (value: string[]) => void;
}

export const FormInputList = (props: FormInputListProps) => {
  const {
    addIcon,
    removeIcon,
    placeholder = "Please input",
    value,
    onChange,
  } = props;
  const [valueList, setValueList] = useState<string[]>([""]);

  const value4Render = useMemo(() => {
    return value || valueList;
  }, [value, valueList]);

  const handleAddItem = () => {
    const newList = (value4Render || []).concat([""]);
    setValueList(newList);
    onChange?.(newList);
  };

  const handleFieldChange = (e: any, index: number) => {
    const newValues = cloneDeep(value4Render);
    newValues[index] = e.target.value;
    setValueList(newValues);
    onChange?.(newValues);
  };

  const handleSubstractItem = (index: number) => {
    const newValues = cloneDeep(value4Render);
    newValues.splice(index, 1);
    setValueList(newValues);
    onChange?.(newValues);
  };

  return (
    <>
      <div className="form-item-container">
        <Form.Item noStyle>
          <Input
            type="text"
            className="form-item-input"
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
          <div className="form-item-container" key={index}>
            <Form.Item colon={false} noStyle>
              <Input
                value={item}
                type="text"
                className="form-item-input"
                placeholder={placeholder}
                onChange={(e) => handleFieldChange(e, index)}
              />
            </Form.Item>
            <div className="suffix">
              <div className="divider" />
              {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
              <div
                onClick={() => handleSubstractItem(index)}
                className="substract-button"
              >
                {removeIcon || "-"}
              </div>
            </div>
          </div>
        );
      })}
      {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
      <div onClick={handleAddItem} className="form-item-container border-0">
        <div className="form-item-add">
          {addIcon || <IconAdd />}
          <span>Add</span>
        </div>
      </div>
    </>
  );
}
