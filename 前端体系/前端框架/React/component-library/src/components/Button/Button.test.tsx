import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Button, { ButtonProps } from './Button'

const defaultProps = {
  onClick: jest.fn()
}

describe('test Button component', () => {
  it('should render the correct default button', () => {
    //  wrapper 获取到通过render方法解析的React组件实例信息
    const wrapper = render(<Button {...defaultProps}>Nice</Button>)
    // element 则是通过 text 值获取到的类似“DOM”
    const element = wrapper.getByText('Nice') as HTMLButtonElement
  	// 通过 JEST 框架可以做一系列断言
    expect(element).toBeInTheDocument()
    expect(element.tagName).toEqual('BUTTON')
    expect(element).toHaveClass('btn btn-default')
    expect(element.disabled).toBeFalsy()
  	// 触发元素click事件
    fireEvent.click(element)
  	// 断言模拟事件被触发
    expect(defaultProps.onClick).toHaveBeenCalled()
  })
})
