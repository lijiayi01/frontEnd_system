import React from "react";
import { createPortal } from "react-dom";

interface IToastProps {
    msg: string
}

interface IToastState {
    flag: boolean
}

class Toast extends React.Component<IToastProps, IToastState>{
    constructor(props: IToastProps) {
        super(props)
        this.state = {
            flag: true
        }
        this.toastClick = this.toastClick.bind(this)
    }
    toastClick() {
        this.setState({
            flag: !this.state.flag
        })
    }
    render(): React.ReactNode {
        return createPortal(
            <div className="toast">
                {
                    this.state.flag ? <div onClick={this.toastClick} >
                        我是toast内容 {this.props.msg}
                    </div> : null
                }
            </div>,
            document.body
        )
    }
}

export default Toast