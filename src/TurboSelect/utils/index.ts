import { DefaultOptionType } from 'antd/lib/select';
import { Key } from 'react';

/**
 * 合法选项过滤
 */
export const availableValuesFilter = (
  value: Array<Key | DefaultOptionType>,
  options: DefaultOptionType[] = [],
  labelInValue: boolean = false,
) => {
  return value?.filter((valueItem) =>
    options?.some((item) => {
      // 如果是嵌套 则取 option.value 进行比较
      if (labelInValue) {
        return item.value === (valueItem as DefaultOptionType).value;
      }
      return item.value === valueItem;
    }),
  );
};
