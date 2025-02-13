import { message } from "antd";

import { copyToClipboard } from "@toolkit-fe/clipboard";

interface ICopyWrapperProps {
  /**
   * 要复制的内容
   */
  content: string;
  /**
   * 子元素
   */
  children: React.ReactNode;
}

/**
 * 复制容器
 */
export const Copyable = (props: ICopyWrapperProps) => {
  const { content, children } = props;

  if (!children) {
    return null;
  }

  return (
    // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
    <span
      className="copable-wrapper"
      onClick={async () => {
				console.log('开始复制', content)
        await copyToClipboard(content);
				console.log('复制完毕')
        message.success(`已复制 ${content}`);
      }}
    >
      {children}
    </span>
  );
}
