import React, { Component, useEffect } from 'react';

interface IFooter{
    text: string
}
class Footer extends Component<IFooter> {
    constructor(props: IFooter) {
      super(props)
    }
    render() {
        return (
            <footer>
                {this.props.text}

            </footer>
        );
    }

    componentDidUpdate(prevProps: Readonly<IFooter>, prevState: Readonly<{}>, snapshot?: any): void {
        console.log('footer组件更新', prevProps, '!!!', this.props)
    }

    shouldComponentUpdate(nextProps: Readonly<IFooter>, nextState: Readonly<{}>, nextContext: any): boolean {
        console.log('footer组件即将更新', nextProps, '!!!', this.props)
        if(nextProps.text == this.props.text){
            return false
        }
        return true;
    }
}

export default Footer;