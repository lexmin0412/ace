import { SelectProps } from 'antd';
import { DefaultOptionType } from 'antd/lib/select';
import React, { forwardRef, Key } from 'react';

import TurboSelectMulti from './components/multi';
import TurboSelectSingle from './components/single';
import { BaseSelectRef } from './types';

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
const TurboSelect: React.ForwardRefRenderFunction<
  BaseSelectRef,
  TurboSelectProps
> = (props, ref) => {
  const { mode, ...restProps } = props;

  if (mode === 'multiple') {
    return <TurboSelectMulti parentRef={ref} {...restProps} />;
  }

  return <TurboSelectSingle parentRef={ref} {...restProps} />;
};

export default forwardRef(TurboSelect);
