import { Popover } from 'antd';
import { JSX, useEffect, useState } from 'react';
import './index.css';

const colorList = [
  'rgb(0, 0, 0)',
  'rgb(38, 38, 38)',
  'rgb(88, 90, 90)',
  'rgb(138, 143, 141)',
  'rgb(216, 218, 217)',
  'rgb(231, 233, 232)',
  'rgb(239, 240, 240)',
  'rgb(244, 245, 245)',
  'rgb(250, 250, 250)',
  'rgb(255, 255, 255)',
  'rgb(223, 42, 63)',
  'rgb(237, 116, 12)',
  'rgb(236, 170, 4)',
  'rgb(251, 222, 40)',
  'rgb(116, 182, 2)',
  'rgb(29, 192, 201)',
  'rgb(17, 124, 238)',
  'rgb(47, 75, 218)',
  'rgb(96, 27, 222)',
  'rgb(210, 45, 141)',
  'rgb(251, 228, 231)',
  'rgb(253, 230, 211)',
  'rgb(249, 239, 205)',
  'rgb(251, 245, 203)',
  'rgb(232, 247, 207)',
  'rgb(206, 245, 247)',
  'rgb(217, 234, 252)',
  'rgb(217, 223, 252)',
  'rgb(230, 220, 249)',
  'rgb(251, 223, 239)',
  'rgb(241, 162, 171)',
  'rgb(248, 184, 129)',
  'rgb(245, 212, 128)',
  'rgb(252, 231, 90)',
  'rgb(193, 231, 126)',
  'rgb(129, 223, 228)',
  'rgb(129, 187, 248)',
  'rgb(150, 167, 253)',
  'rgb(186, 155, 242)',
  'rgb(242, 151, 204)',
  'rgb(228, 73, 91)',
  'rgb(243, 143, 57)',
  'rgb(243, 187, 47)',
  'rgb(237, 206, 2)',
  'rgb(140, 207, 23)',
  'rgb(1, 178, 188)',
  'rgb(47, 142, 244)',
  'rgb(72, 97, 224)',
  'rgb(126, 69, 232)',
  'rgb(231, 70, 164)',
  'rgb(173, 26, 43)',
  'rgb(199, 92, 0)',
  'rgb(201, 145, 3)',
  'rgb(165, 143, 4)',
  'rgb(92, 141, 7)',
  'rgb(7, 120, 126)',
  'rgb(12, 104, 202)',
  'rgb(33, 59, 192)',
  'rgb(76, 22, 177)',
  'rgb(174, 20, 110)',
  'rgb(112, 0, 13)',
  'rgb(102, 48, 0)',
  'rgb(102, 73, 0)',
  'rgb(102, 88, 0)',
  'rgb(42, 66, 0)',
  'rgb(0, 67, 71)',
  'rgb(0, 52, 107)',
  'rgb(16, 30, 96)',
  'rgb(39, 0, 112)',
  'rgb(92, 0, 54)',
];

interface ColorPickerProps {
  labelForSelected?: string;
  value?: string;
  onChange?: (color: string) => void;
  children: JSX.Element | JSX.Element[];
}

export const ColorPicker = (props: ColorPickerProps) => {
  const { labelForSelected = 'Selected', value, children, onChange } = props;
  const [open, setOpen] = useState(false);
  const [currentColor, setCurrentColor] = useState('#000');

  useEffect(() => {
    if (value) {
      setCurrentColor(value);
    }
  }, [value]);

  useEffect(() => {
    // 监听外部元素点击
    const eventListener = function (event: any) {
      if (!event.target.classList.contains('antd-ce-color-item-inner')) {
        setOpen(false);
      }
    };
    document.addEventListener('click', eventListener);
    return () => {
      document.removeEventListener('click', eventListener);
    };
  }, []);

  const handleColorChange = (color: string) => {
    console.log('handleColorChange', color);
    if (!value) {
      setCurrentColor(color);
    }
    setOpen(false);
    onChange?.(color);
  };

  const ColorItem = (props: { color: string }) => {
    const { color } = props;
    return (
      <div
        key={color}
        className="antd-ce-color-item"
        onClick={() => handleColorChange(color)}
      >
        <div
          className="antd-ce-color-item-inner"
          style={{
            backgroundColor: color,
          }}
        />
      </div>
    );
  };

  return (
    <Popover
      open={open}
      title=""
      content={
        <div>
          <div className="header">
            <ColorItem color={currentColor} />
            <div className="header-title">{labelForSelected}</div>
          </div>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              width: '240px',
            }}
          >
            {colorList.map((color) => {
              return <ColorItem key={color} color={color} />;
            })}
          </div>
        </div>
      }
    >
      <div
        id="antd-ce-popover-overlay"
        className="antd-ce-popover-overlay"
        onClick={(event) => {
          event.stopPropagation();
          setOpen(true);
        }}
      >
        {children}
      </div>
    </Popover>
  );
}
