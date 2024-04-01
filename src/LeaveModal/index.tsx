import { Modal } from 'antd';
import React, { useEffect } from 'react';

const popStateListener = function () {
  history.pushState(null, '', window.location.href);
  Modal.confirm({
    title: '确定离开此页面？',
    content: '您所做的修改可能不会被保存',
    onOk: () => {
      console.log('ok');
    },
  });
};

export default function LeaveModal() {
  useEffect(() => {
    // 浏览器后退提示 start
    history.pushState(null, '', window.location.href);
    window.addEventListener('popstate', popStateListener);
    // 浏览器后退提示 end

    // 浏览器刷新提示 start
    // 各浏览器对这个事件的实现存在巨大差异
    // IE 需要显式返回一个非空字符串，才会弹出对话框
    // 大多数浏览器在无法自定义文本
    // 综上，采用以下写法以期得到最大兼容。
    window.addEventListener('beforeunload', function (e) {
      const confirmationMessage = '确认关闭窗口？';
      e.returnValue = confirmationMessage;
      return confirmationMessage;
    });

    return () => {
      // 组件卸载时移除监听
      window.onbeforeunload = null;
      window.removeEventListener('popstate', popStateListener);
    };
  }, []);

  return <>Leave Modal</>;
}
