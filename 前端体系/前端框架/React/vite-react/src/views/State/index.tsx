import Footer from "@/component/State/Footer"
import List from "@/component/State/List"
import React, { ChangeEvent } from "react"

interface IState {
    list: Array<any>,
    text: string,
    name?: string
}
class State extends React.Component<any, IState>{
    constructor(props: any) {
        super(props)
        this.state = {
            list: [
                {
                    name: 'apple',
                    price: 10
                }
            ],
            text: 'footer text',
            name: ''
        }
    }
    change = (e: ChangeEvent<HTMLInputElement>) => {
        this.setState({
            name: e.target.value
        })
    }

    add = (e: React.MouseEvent<HTMLButtonElement>) => {
        this.setState({
            list: this.state.list.concat([{
                name: this.state.name,
                price: 200
            }])
        })
    }
    render(): React.ReactNode {
        return (
            <div>state

                <List list={this.state.list}></List>
                <div>
                    <input type="text" value={this.state.name} onChange={this.change} />
                    <button onClick={this.add}>添加</button>
                </div>
                <Footer text={this.state.text}></Footer>
            </div>
        )
    }
}


export default State

