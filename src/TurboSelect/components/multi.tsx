import { Empty, Select, Tag, Tooltip } from 'antd';
import type { DefaultOptionType } from 'antd/lib/select';
import _ from 'lodash';
import type React from 'react';
import { type Key, forwardRef, useImperativeHandle, useRef } from 'react'

import { useSelectCommonHooks } from '../hooks';
import type { TurboSelectInnerProps } from '../types';
import { availableValuesFilter } from '../utils';

/**
 * TurboSelect 多选实现
 */
const TurboSelectMulti = (props: TurboSelectInnerProps) => {
  const { availableValues, parentRef, disabled, value, labelInValue } = props;
  const searching = useRef(false);
  const turboSelectRef = useRef<any>(null);

  const searchIdsGetter = (ids: any[]) => {
    const searchIds = Array.from(
      new Set((availableValues || []).concat(ids || [])),
    );
    return searchIds;
  };

  const dropdownVisibleChangeHandler = (
    visible: boolean,
    handlerOptions: {
      value: any;
      onChange: any;
    },
  ) => {
    const { value, onChange } = handlerOptions;
    // 正在搜索状态切换
    if (visible) {
      // setSearching(true)
    } else {
      searching.current = false;
      triggerChange(value, onChange);
    }
  };

  /**
   * 个性化的 change 事件处理器
   * @param newValue
   * @param handlerOptions
   */
  const selectChangeHandler = (
    newValue: Key[],
    handlerOptions: {
      open: any;
      onChange: any;
    },
  ) => {
    const { open, onChange } = handlerOptions;
    if (!open && onChange) {
      triggerChange(newValue, onChange);
    }
  };

  const blurHandler = (
    _: any,
    handlerOptions: {
      value: any;
      onBlur: React.FocusEventHandler;
    },
  ) => {
    const { value, onBlur } = handlerOptions;
    const validValue = availableValuesFilter(
      value,
      baseProps.options,
      labelInValue,
    );
    onBlur?.({
      target: {
        // @ts-ignore // TODO blur的类型定义与原生事件不一致，需要调整一下
        value: validValue,
      },
    });
  };

  const baseProps = useSelectCommonHooks(
    {
      ...props,
      searchIdsGetter,
      selectChangeHandler: selectChangeHandler as any,
      dropdownVisibleChangeHandler,
      // @ts-ignore
      blurHandler,
    },
    turboSelectRef,
  );

  /**
   * 最终触发 onChange
   */
  const triggerChange = (newValue: any, onChange: any) => {
    // 如果修改后的值与当前值一致，则不触发 onChange
    if (_.isEqual(newValue, value)) {
      return;
    }

    // 正在搜索时，不对选项进行过滤
    if (searching.current) {
      onChange?.(
        newValue,
        newValue?.map((item: any) => {
          return baseProps.options?.find((option) => option.value === item);
        }),
      );
    } else {
      const validValue = availableValuesFilter(
        newValue,
        baseProps.options,
        labelInValue,
      );
      onChange?.(
        validValue,
        validValue?.map((item) => {
          return baseProps.options?.find((option) => option.value === item);
        }),
      );
    }
  };

  const handleSearch = (searchValue: string) => {
    searching.current = !!searchValue;
    // 触发默认的 onSearch 行为
    baseProps.onSearch?.(searchValue, baseProps.value as unknown as string[]);
  };

  useImperativeHandle(parentRef, () => ({
    getValue: () => {
      return baseProps.value;
    },
    getLabel: () => {
      return baseProps.options
        ?.filter((item) => baseProps.value?.includes(item.value as string))
        ?.map((item) => {
          return item.originalLabel || item.label;
        });
    },
    focus: () => {
      turboSelectRef.current?.focus();
    },
  }));

  return (
    <Select
      {...baseProps}
      ref={turboSelectRef}
      onSearch={handleSearch}
      mode="multiple"
      maxTagCount={baseProps.maxTagCount}
      notFoundContent={
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Empty />
        </div>
      }
      maxTagPlaceholder={(values) => {
        const validValues = searching.current
          ? values
          : availableValuesFilter(
              values as DefaultOptionType[],
              baseProps.options || [],
              true,
            );
        return (
          <Tooltip
            arrowPointAtCenter
            overlayClassName="bg-white"
            placement="topLeft"
            title={
              // TODO 处理这里的事件冒泡，选中文字/点击不要触发 Select 的对应事件
              validValues.map((item: any) => {
                return <div key={item}>{item}</div>;
              })
            }
          >
            +{validValues?.length}
          </Tooltip>
        );
      }}
      tagRender={(props) => {
        const { label, value, closable, onClose } = props;
        const onPreventMouseDown = (
          event: React.MouseEvent<HTMLSpanElement>,
        ) => {
          event.preventDefault();
          event.stopPropagation();
        };
        // 过滤掉外部传入的非法值，如因 split 运用不当生成的空字符串 option
        if (!label && !value) {
          return <></>;
        }
        const isExisted = baseProps.options?.some(
          (option) => option.value === value,
        );
        // 如果正在搜索，不隐藏不在options中的tag
        return searching || isExisted ? (
          <Tag
            onMouseDown={onPreventMouseDown}
            closable={closable}
            onClose={onClose}
            style={{
              display: 'flex',
              alignItems: 'center',
              height: '24px',
              lineHeight: '24px',
              fontSize: '14px',
              margin: 3,
              color: disabled ? '#bfbfbf' : '#000000',
              border: '1px solid',
              borderColor: disabled ? '#d9d9d9' : '#f0f0f0',
              background: '#f5f5f5',
            }}
          >
            {label}
          </Tag>
        ) : (
          // TODO 这里是为了处理 如果span里面内容为空，其他的正常tag都会变成绝对定位不能展示 的问题，需要看下是否有更优雅的解决方案
          <span
            style={{
              display: 'block',
              width: '1px',
              height: '1px',
              opacity: 1,
              overflow: 'hidden',
            }}
          >
            占位
          </span>
        );
      }}
    />
  );
};

export default forwardRef(TurboSelectMulti);
