import type { TurboSelectProps } from '..';

/**
 * rc-virtual-list 同名类型的 fork
 * @version ant-design 4.21.5
 * @version rc-select 14.1.6
 * @version rc-virtual-list 3.4.8
 */
export interface BaseSelectRef {
  focus: () => void;
  blur?: () => void;
  scrollTo?: (arg: number | unknown) => void;
}

export interface TurboSelectInnerProps extends TurboSelectProps {
  parentRef: any;
}
