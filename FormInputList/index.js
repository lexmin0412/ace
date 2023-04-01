function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
/**
 * 批量录入组件，可用于数组形式字段的批量录入，如微信第三方域名配置
 */

import { Form, Input } from 'antd';
import _ from 'lodash';
import React, { useMemo, useState } from 'react';
import IconAdd from "./icon-add";
import styles from "./index.module.less";
export default function FormInputList(props) {
  var _props$placeholder = props.placeholder,
    placeholder = _props$placeholder === void 0 ? '请输入' : _props$placeholder,
    value = props.value,
    onChange = props.onChange;
  var _useState = useState(['']),
    _useState2 = _slicedToArray(_useState, 2),
    valueList = _useState2[0],
    setValueList = _useState2[1];
  var value4Render = useMemo(function () {
    return value || valueList;
  }, [value, valueList]);
  var handleAddItem = function handleAddItem() {
    var newList = (value4Render || []).concat(['']);
    setValueList(newList);
    onChange === null || onChange === void 0 ? void 0 : onChange(newList);
  };
  console.log('value4Render', value4Render);
  var handleFieldChange = function handleFieldChange(e, index) {
    var newValues = _.cloneDeep(value4Render);
    newValues[index] = e.target.value;
    setValueList(newValues);
    onChange === null || onChange === void 0 ? void 0 : onChange(newValues);
  };
  var handleSubstractItem = function handleSubstractItem(index) {
    var newValues = _.cloneDeep(value4Render);
    newValues.splice(index, 1);
    setValueList(newValues);
    onChange === null || onChange === void 0 ? void 0 : onChange(newValues);
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: styles['form-item-container']
  }, /*#__PURE__*/React.createElement(Form.Item, {
    noStyle: true
  }, /*#__PURE__*/React.createElement(Input, {
    type: "text",
    className: styles['form-item-input'],
    placeholder: placeholder,
    value: value4Render === null || value4Render === void 0 ? void 0 : value4Render[0],
    onChange: function onChange(e) {
      return handleFieldChange(e, 0);
    }
  }))), value4Render === null || value4Render === void 0 ? void 0 : value4Render.map(function (item, index) {
    if (index === 0) {
      return null;
    }
    return /*#__PURE__*/React.createElement("div", {
      className: styles['form-item-container'],
      key: index
    }, /*#__PURE__*/React.createElement(Form.Item, {
      colon: false,
      noStyle: true
    }, /*#__PURE__*/React.createElement(Input, {
      value: item,
      type: "text",
      className: styles['form-item-input'],
      placeholder: placeholder,
      onChange: function onChange(e) {
        return handleFieldChange(e, index);
      }
    })), /*#__PURE__*/React.createElement("div", {
      className: styles['suffix']
    }, /*#__PURE__*/React.createElement("div", {
      className: styles['divider']
    }), /*#__PURE__*/React.createElement("div", {
      onClick: function onClick() {
        return handleSubstractItem(index);
      },
      className: styles['substract-button']
    }, "-")));
  }), /*#__PURE__*/React.createElement("div", {
    onClick: handleAddItem,
    className: "".concat(styles['form-item-container'], " ").concat(styles['border-0'])
  }, /*#__PURE__*/React.createElement("div", {
    className: styles['form-item-add']
  }, /*#__PURE__*/React.createElement(IconAdd, null), /*#__PURE__*/React.createElement("span", null, "\u6DFB\u52A0"))));
}