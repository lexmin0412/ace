import { Select } from 'antd';
import React, { type Key, useImperativeHandle, useRef } from 'react';
import { useSelectCommonHooks } from '../hooks';
import type { TurboSelectInnerProps } from '../types';

/**
 * TurboSelect 单选实现
 */
const TurboSelectSingle = (props: TurboSelectInnerProps) => {
  const { availableValues, options, parentRef } = props;

  const turboSelectRef = useRef<any>(null);

  const searchIdsGetter = (ids: any[]) => {
    const searchIds = Array.from(
      new Set((availableValues || []).concat(ids || [])),
    );
    return availableValues || ids ? searchIds : undefined;
  };

  const selectChangeHandler = (
    newValue: Key,
    handlerOptions: {
      setOpen: any;
      onChange: any;
      options: any;
    },
  ) => {
    const { setOpen, onChange } = handlerOptions;
    setOpen(false);

    if (onChange) {
      const option = options?.find((item) => item.value === newValue);
      onChange(newValue, option);
    }
  };

  const baseProps = useSelectCommonHooks(
    {
      ...props,
      searchIdsGetter: searchIdsGetter as any,
      selectChangeHandler: selectChangeHandler as any,
    },
    turboSelectRef,
  );

  useImperativeHandle(parentRef, () => ({
    getValue: () => {
      return baseProps.value;
    },
    getLabel: (): string => {
      const currentItem = baseProps.options?.find(
        (item) => item.value === baseProps.value,
      );
      return currentItem ? currentItem.originalLabel || currentItem.label : '';
    },
    focus: () => {
      turboSelectRef.current?.focus();
    },
  }));

  return <Select {...baseProps} ref={turboSelectRef} />;
};

export default TurboSelectSingle;
