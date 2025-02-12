import type { SelectProps } from 'antd';
import type { DefaultOptionType } from 'antd/lib/select';
import _ from 'lodash';
import type React from 'react';
import { type Key, useCallback, useEffect, useMemo, useState } from 'react'

import type { TurboSelectProps } from '../index';

interface UseCommonHooksProps extends TurboSelectProps {
  /**
   * 搜索函数中的 ids 入参获取函数
   */
  searchIdsGetter: (ids: Key[]) => Key[];
  /**
   * onChange 事件处理函数
   */
  selectChangeHandler?: (
    value: Key | Key[],
    handlerOptions: {
      /**
       * 下拉面板是否显示
       */
      open: boolean;
      /**
       * 下拉面板显示隐藏切换
       */
      setOpen: (open: boolean) => void;
      /**
       * 原生 onChange 事件
       */
      onChange: (
        value: Key | Key[],
        option: DefaultOptionType | DefaultOptionType[],
      ) => void;
      /**
       * select 的选项
       */
      options: DefaultOptionType[];
    },
  ) => void;
  /**
   * 下拉框显示隐藏处理函数
   */
  dropdownVisibleChangeHandler?: (
    visible: boolean,
    handlerOptions: {
      value: Key | Key[];
      onChange: (
        value: Key | Key[],
        option: DefaultOptionType | DefaultOptionType[],
      ) => void;
    },
  ) => void;
  /**
   * 失焦事件处理函数
   */
  blurHandler?: (
    e: React.FocusEvent,
    handlerOptions: {
      value: Key | Key[];
      onBlur: React.FocusEventHandler;
    },
  ) => void;
}

/**
 * TurboSelect 公共逻辑 hook 接收外层 props 返回传递给 Select 组件的 props
 */
export const useSelectCommonHooks = (
  props: UseCommonHooksProps,
  turboSelectRef: any,
): SelectProps => {
  const {
    /** 非 select 原生 props begin */
    searchIdsGetter,
    selectChangeHandler,
    dropdownVisibleChangeHandler,
    blurHandler,
    /** 非 select 原生 props end */
    disabled,
    mode,
    placeholder,
    value: propsValue,
    options,
    onChange,
    onBlur,
    request,
    availableValues,
    disabledValues,
    customLabelRenderer,
    allowClear,
    style,
    bordered,
    className,
    maxTagCount = 'responsive',
    suffixIcon,
    showSearch = true,
    labelInValue,
  } = props;

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<SelectProps['options']>([]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string>();
  const [focused, setFocused] = useState(false);

  /**
   * 可用选项过滤器
   */
  const availableFilter = useCallback(
    (item: any) => {
      if (availableValues?.length) {
        return availableValues.includes(item.value);
      }
      return !disabledValues?.includes(item.value);
    },
    [availableValues, disabledValues],
  );

  /***
   * label 渲染逻辑
   */
  const itemLabelHandler = useCallback(
    (item: DefaultOptionType) => {
      // 如果有传入自定义函数，则优先使用
      if (customLabelRenderer) {
        return {
          ...item,
          originalLabel: item.label,
          label: customLabelRenderer(item),
        };
      }
      // 处理配置 自定义label
      if (item.config) {
        const { color } = JSON.parse(item.config);
        return {
          ...item,
          originalLabel: item.label, // 保留原本 label，保证需要时能获取到正确数据
          label: (
            <div className="flex items-center justify-between">
              <div>{item.label}</div>
              <div
                style={{
                  background: color,
                  width: '16px',
                  height: '16px',
                  borderRadius: '4px',
                }}
              />
            </div>
          ),
        };
      }
      return item;
    },
    [customLabelRenderer],
  );

  /**
   * 根据 config 字段生成自定义的 options
   */
  const generatedOptions = useMemo(() => {
    return options
      ?.map((item) => {
        return itemLabelHandler(item);
      })
      .filter(availableFilter);
  }, [options, availableFilter, itemLabelHandler]);

  /**
   * 根据输入框中的关键字和当前值进行搜索
   */
  const handleSearch = useCallback(
    async (searchValue: string, ids?: string[]) => {
      if (!request) {
        return Promise.resolve([]);
      }
      setLoading(true);
      const res = await request(searchValue, searchIdsGetter(ids as any));
      setData(
        res
          ?.map((item) => {
            return itemLabelHandler(item);
          })
          ?.filter(availableFilter),
      );
      setLoading(false);
    },
    [availableFilter, request, searchIdsGetter, itemLabelHandler],
  );

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (request) {
      handleSearch(
        '',
        propsValue && typeof propsValue === 'string'
          ? [propsValue]
          : propsValue,
      );
    }
  }, []);

  const handleClick = useCallback(() => {
    // 如果已聚焦但未展示下拉面板，则展示
    if (focused && !open) {
      setOpen(true);
    }
  }, [focused, open]);

  const handleFocus = useCallback(async () => {
    setFocused(true);
    // 聚焦时 如果有 request 则请求
    if (request) {
      await handleSearch(
        '',
        propsValue && typeof propsValue === 'string'
          ? [propsValue]
          : propsValue,
      );
    }
    // 有 request 请求时，request 成功才展开下拉面板
    setOpen(true);
  }, [handleSearch, propsValue, request]);

  const handleBlur = useCallback(() => {
    blurHandler?.(null as any, {
      value: value as any,
      onBlur: onBlur as any,
    });
    setOpen(false);
  }, [blurHandler, onBlur, value]);

  // 外部的值改变时请求一遍
  useEffect(() => {
    // 如果外部传入的值与当前值相等则忽略
    if (_.isEqual(propsValue, value)) {
      return;
    }
    if (request) {
      handleSearch(
        '',
        propsValue && typeof propsValue === 'string'
          ? [propsValue]
          : propsValue,
      );
    }
    setValue(propsValue);
  }, [propsValue]);

  const handleClear = useCallback(async () => {
    if (!focused) {
      turboSelectRef.current.focus();
    } else {
      if (request && focused) {
        await handleSearch('');
      }
    }
  }, [focused, handleSearch, request, turboSelectRef]);

  /**
   * 基础的非函数属性
   * 注意：需要一个声明一个，很多属性的默认行为是要内部自定义的，不暴露给外部使用
   */
  const simpleProps = useMemo(() => {
    return {
      bordered: bordered,
      open: open,
      loading,
      className: `ace-turbo-select ${className}`,
      allowClear: allowClear,
      mode: mode,
      disabled: disabled,
      showSearch,
      value: value,
      placeholder: placeholder,
      style: style,
      defaultActiveFirstOption: false,
      showArrow: !disabled,
      filterOption: request
        ? false
        : (input: any, option: any) => {
            return (option?.label ?? '')
              ?.toLowerCase()
              ?.includes(input.toLowerCase());
          },
      notFoundContent: null,
      options: request ? data : generatedOptions,
      dropdownStyle: {
        padding: '6px',
      },
      maxTagCount,
      suffixIcon,
      labelInValue,
    };
  }, [
    allowClear,
    bordered,
    className,
    data,
    disabled,
    generatedOptions,
    loading,
    maxTagCount,
    mode,
    open,
    placeholder,
    request,
    style,
    suffixIcon,
    value,
    showSearch,
    labelInValue,
  ]);

  const handleChange = useCallback(
    (newValue: string) => {
      setValue(newValue);
      selectChangeHandler?.(newValue, {
        open,
        setOpen,
        options: simpleProps.options || [],
        onChange: onChange as any,
      });
    },
    [onChange, open, selectChangeHandler, simpleProps.options],
  );

  const handleDropdownVisibleChange = useCallback(
    (visible: boolean) => {
      setOpen(visible);
      dropdownVisibleChangeHandler?.(visible, {
        value: value as any,
        onChange: onChange as any,
      });
    },
    [value, onChange, dropdownVisibleChangeHandler],
  );

  const finalProps = useMemo(() => {
    return {
      ...simpleProps,
      onSearch: handleSearch,
      onChange: handleChange,
      onClick: handleClick,
      onFocus: handleFocus,
      onBlur: handleBlur,
      onClear: handleClear,
      onDropdownVisibleChange: handleDropdownVisibleChange,
    };
  }, [
    simpleProps,
    handleSearch,
    handleChange,
    handleClick,
    handleFocus,
    handleBlur,
    handleClear,
    handleDropdownVisibleChange,
  ]);

  return finalProps;
};
