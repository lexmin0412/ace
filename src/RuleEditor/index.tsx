import { Select } from 'antd'
import type { Rule } from 'json-rules-engine'

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
type ILogicRule = Record<ILogicOperator, IRule[]>

enum LogicOperatorEnum {
  ALL = 'all',
  ANY = 'any',
}

type LogicOperatorType = `${LogicOperatorEnum}`;

interface IProperty {
  /**
   * 属性名称
   */
  label: string,
  /**
   * 属性 key
   */
  value: string,
  /**
   * 属性的控件类型，可选值控件根据 type 决定
   */
  type: string,
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

export const RuleEditor = (props: IRuleEditorProps) => {

  const { value, properties } = props

  const Item = (props: {
    conditions: ILeafRule
  }) => {
    const { conditions } = props
    return <div>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        marginBottom: '10px'
      }}>
        <Select placeholder='属性' style={{
          width: '160px'
        }} options={properties} value={conditions.fact} />
        <Select style={{
          width: '160px',
          marginLeft: '10px'
        }} placeholder='运算符' options={[
          {
            label: '等于',
            value: 'equal',
          },
          {
            label: '大于',
            value: 'greaterThan',
          },
          {
            label: '大于等于',
            value: 'greaterThanInclusive',
          },
          {
            label: '小于',
            value: 'lessThan',
          },
          {
            label: '小于等于',
            value: 'lessThanInclusive',
          }
        ]} />
        <Select style={{
          width: '160px',
          marginLeft: '10px'
        }} placeholder='值' options={[
          {
            label: '18',
            value: '18',
          }
        ]} />
      </div>
    </div>
  }

  const Group = (props: {
    conditions: IRule
  }) => {
    const { conditions } = props
    // 如果没有 any 或者 all 则直接渲染 item
    if (!(conditions as ILogicRule).any && !(conditions as ILogicRule).all) {
      return <Item conditions={conditions as ILeafRule} />
    }
    const logicOperator = Object.keys(conditions)[0] as LogicOperatorType
    return <div style={{
      display: 'flex',
      alignItems: 'center',
    }}>
      <Select style={{
        width: '80px'
      }} variant='borderless' value={logicOperator} options={properties} />

      <div>
        {
          (conditions as ILogicRule)[logicOperator].map((item, index: number) => {
            return (
              <Group key={index} conditions={item} />
            )
          })
        }
      </div>
    </div>
  }

  // @ts-ignore
  return <Group conditions={value} />
}
