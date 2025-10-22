import { SearchOutlined } from "@ant-design/icons";
import { Input, Popover, Empty } from "antd";
import React, { useState } from "react";
import "./searchable-list-popover.css";
import type { PopoverProps } from "antd";

export interface IMenuItem {
  key: string;
  label: string;
}

interface ISearchableListPopoverProps {
  /**
   * 当前选中的 key
   */
  current?: string;
  /**
   * 触发元素
   */
  children?: React.ReactNode;
  /**
   * 可选的下拉菜单列表
   */
  menuList: IMenuItem[];
  /**
   * 下拉菜单选择回调
   */
  onMenuSelect: (key: string, item: IMenuItem) => void;
  /**
   * 弹出层位置（Antd Popover placement）
   */
  placement?: PopoverProps["placement"];
}

/**
 * 支持搜索的 Dropdown 组件
 */
export default function SearchableListPopover(props: ISearchableListPopoverProps) {
  const { current, menuList, onMenuSelect, children, placement } = props;

  const [keyword, setKeyword] = useState<string>("");
  const menuItems: IMenuItem[] = menuList.filter((item) => {
    if (!keyword) {
      return true;
    }
    return item.label.includes(keyword);
  });

  return (
    <Popover
      classNames={{
        body: "slp-overlay"
      }}
      styles={{
        body: {
          padding: '0'
        }
      }}
      trigger={["click"]}
      content={
        <div className="slp-content">
          <div className="slp-search">
            <Input
              value={keyword}
              allowClear
              placeholder="搜索"
              suffix={<SearchOutlined />}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>
          <div className="slp-list">
            {menuItems.length === 0 ? (
              <Empty description="暂无数据" />
            ) : (
              menuItems.map((item) => {
                let itemClassNames = "slp-item";
                if (item?.key === current) {
                  itemClassNames += " slp-item--selected";
                }
                return (
                  <div
                    className={itemClassNames}
                    key={item?.key}
                    onClick={() => onMenuSelect(item?.key, item)}
                  >
                    {item?.label}
                  </div>
                );
              })
            )}
          </div>
        </div>
      }
      placement={placement ?? "rightBottom"}
    >
      {children}
    </Popover>
  );
}
