import React, { Component } from 'react';

interface IList {
    list: Array<any>
}
class List extends Component<IList> {
    constructor(props:IList) {
      super(props)
    
      
    }
    render() {
        return (
            <div>
                <ul>
                    {
                        this.props.list.map((item, index)=>
                        <li key={index}>
                            <div>{item.name}</div>
                            <div>{item.price}</div>
                        </li>
                        )
                    }
                </ul>
            </div>
        );
    }
}

export default List;