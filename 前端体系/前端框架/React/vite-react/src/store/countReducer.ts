


const initState: ICount = {
    age: 10,
    name: 'ljy'
}

const countReducer = (preState = initState, action: IAction)=>{
    const {type, payload} = action
    switch(type){
        case 'add':
            return {...preState, age: preState.age + payload};
        default:
            return preState;
    }
}

export default countReducer