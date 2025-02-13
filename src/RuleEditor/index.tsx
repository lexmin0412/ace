import { Input, InputNumber, Select } from 'antd'
import type { DefaultOptionType } from 'antd/es/select'
import type { Rule } from 'json-rules-engine'
import React, { useContext } from 'react'

/**
 * 具体规则节点
 */
interface ILeafRule {
  fact: string
  operator: string
  value: any
}

/**
 * 规则节点
 */
type IRule = ILogicRule | ILeafRule

/**
 * 逻辑运算符
 */
type ILogicOperator = 'all' | 'any'

/**
 * 逻辑节点（根节点一定是逻辑节点，使用此类型）
 */
export type ILogicRule = Record<ILogicOperator, IRule[]>

enum LogicOperatorEnum {
  ALL = 'all',
  ANY = 'any',
}

type LogicOperatorType = `${LogicOperatorEnum}`;

/**
 * 逻辑运算符下拉选项
 */
const LoginOperatorOptions = Object.keys(LogicOperatorEnum).map((key) => {
  return {
    label: key,
    value: LogicOperatorEnum[key as keyof typeof LogicOperatorEnum],
  }
})

export interface IProperty {
  /**
   * 属性名称
   */
  title: string,
  /**
   * 属性 key
   */
  code: string,
  /**
   * 属性类型
   */
  type: keyof typeof OperatorTypeMap,
  /**
   * 属性的控件类型，可选值控件根据 type 决定
   */
  widget: 'text' | 'number' | 'mtText' | 'select',
  /**
   * 控件属性
   */
  controlProps: {
    /**
     * 下拉选项
     */
    options?: DefaultOptionType[]
    /**
     * 异步下拉选项
     */
    dynamicOptions?: (keyword: string, ids?: string[]) => Promise<DefaultOptionType[]>
  }
}

interface IRuleEditorProps {
  /**
   * 规则
   */
  value?: ILogicRule
  /**
   * 规则改变事件
   */
  onChange?: (value: Rule) => void
  /**
   * 可选属性列表
   */
  properties: IProperty[]
}

// const engine = new Engine()

const OperatorTypeMap = {
  String: ['equal', 'notEqual'],
  Numeric: ['equal', 'notEqual', 'greaterThan', 'greaterThanInclusive', 'lessThan', 'lessThanInclusive'],
  Array: ['in', 'notIn', 'contains', 'doesNotContain '],
}

const RuleEditorContext = React.createContext<{
  properties: IProperty[]
}>({
  properties: []
})

/**
 * 叶子节点编辑器
 */
const LeafRuleEditor = (props: {
  conditions: ILeafRule
  onConditionsChange: (conditions: ILeafRule) => void
}) => {
  const { properties } = useContext(RuleEditorContext)
  const { conditions, onConditionsChange } = props

  // 通过属性列表映射出下拉选项
  const propertyOptions = properties.map((item) => {
    return {
      label: item.title,
      value: item.code,
    }
  })

  // 通过选定的 fact 找到可选的运算符列表
  const factItem = properties.find((item) => item.code === conditions.fact)
  const operators = factItem ? OperatorTypeMap[(factItem as IProperty).type] : []

  return <div>
    <div style={{
      display: 'flex',
      alignItems: 'center',
      marginBottom: '10px'
    }}>
      <Select placeholder='属性' style={{
        width: '160px'
      }} options={propertyOptions} value={conditions.fact} onChange={(value) => onConditionsChange({
        ...conditions,
        fact: value
      })} />
      <Select style={{
        width: '160px',
        marginLeft: '10px'
      }} placeholder='运算符' options={operators.map((item) => {
        return {
          label: item,
          value: item,
        }
      })} value={conditions.operator} onChange={(value) => onConditionsChange({
        ...conditions,
        operator: value
      })} />
      {
        factItem?.widget === 'text' ?
          <Input style={{
            width: '160px',
            marginLeft: '10px'
          }} type='text' placeholder='请输入' value={conditions.value} onChange={(value) => onConditionsChange({
            ...conditions,
            value: value
          })} />
          :
          factItem?.widget === 'number' ?
            <InputNumber style={{
              width: '160px',
              marginLeft: '10px'
            }} type='number' {...factItem.controlProps} placeholder='请输入' value={conditions.value} onChange={(value) => onConditionsChange({
              ...conditions,
              value: value
            })} />
            :
            factItem?.widget === 'select' ?
              <Select mode={factItem.type === 'String' ? undefined : 'multiple'} style={{
                width: '160px',
                marginLeft: '10px'
              }} placeholder='值' options={factItem.controlProps.options} value={conditions.value} onChange={(value) => onConditionsChange({
                ...conditions,
                value: value
              })} />
              : null
      }

    </div>
  </div>
}

const RuleEditorNode = (props: {
  conditions: IRule
  onConditionsChange: (conditions: IRule) => void
}) => {
  const { conditions, onConditionsChange } = props
  const { properties } = useContext(RuleEditorContext)
  // 如果没有 any 或者 all 则直接渲染 item
  if (!(conditions as ILogicRule).any && !(conditions as ILogicRule).all) {
    return <LeafRuleEditor conditions={conditions as ILeafRule} onConditionsChange={onConditionsChange} />
  }
  const logicOperator = Object.keys(conditions)[0] as LogicOperatorType

  const handleConditionChange = (changedIndex: number, value: IRule) => {
    const newRules = (conditions as ILogicRule)[logicOperator].map((item, index) => {
      if (changedIndex === index) {
        return value
      }
      return item
    })
    onConditionsChange({
      [logicOperator]: newRules
    } as ILogicRule)
  }

  return <div style={{
    display: 'flex',
    alignItems: 'center',
  }}>
    <Select style={{
      width: '80px'
    }} variant='borderless' value={logicOperator} options={LoginOperatorOptions} onChange={(value: LogicOperatorType) => {
      // @ts-ignore
      const newValue: ILogicRule = {
        [value as LogicOperatorType]: (conditions as ILogicRule)[logicOperator]
      }
      onConditionsChange(newValue)
    }} />

    <div>
      {
        (conditions as ILogicRule)[logicOperator].map((item, index: number) => {
          return (
            <RuleEditorNode key={index} conditions={item} onConditionsChange={(newConditions) => handleConditionChange(index, newConditions)} />
          )
        })
      }
    </div>
  </div>
}

export const RuleEditor = (props: IRuleEditorProps) => {

  const { value, onChange, properties = [] } = props

  return <RuleEditorContext.Provider value={{ properties }}>
    {/* @ts-ignore */}
    <RuleEditorNode conditions={value} onConditionsChange={onChange} />
  </RuleEditorContext.Provider>
}
