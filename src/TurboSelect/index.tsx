import type { SelectProps } from 'antd';
import type { DefaultOptionType } from 'antd/lib/select';
import type React from 'react';
import { forwardRef, type Key } from 'react'

import TurboSelectMulti from './components/multi';
import TurboSelectSingle from './components/single';
import type { BaseSelectRef } from './types';

export interface TurboSelectProps extends SelectProps {
  request?: (
    searchValue: string,
    ids: Key[],
  ) => Promise<SelectProps['options']>;
  availableValues?: Key[];
  disabledValues?: Key[];
  /**
   * 自定义 label 渲染函数
   * @param item 数据条目对象
   */
  customLabelRenderer?: (item: DefaultOptionType) => React.ReactNode;
}

/**
 * Ant Design Select 终极封装，完善每一个交互细节
 */
const TurboSelectInner: React.ForwardRefRenderFunction<
  BaseSelectRef,
  TurboSelectProps
> = (props, ref) => {
  const { mode, ...restProps } = props;

  if (mode === 'multiple') {
    return <TurboSelectMulti parentRef={ref} {...restProps} />;
  }

  return <TurboSelectSingle parentRef={ref} {...restProps} />;
};

export const TurboSelect = forwardRef(TurboSelectInner);
