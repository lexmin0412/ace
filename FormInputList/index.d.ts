/**
 * 批量录入组件，可用于数组形式字段的批量录入，如微信第三方域名配置
 */
/// <reference types="react" />
interface FormInputListProps {
    placeholder?: string;
    value?: string[];
    onChange?: (value: string[]) => void;
}
export default function FormInputList(props: FormInputListProps): JSX.Element;
export {};
