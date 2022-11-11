interface ICar {
    noticeNum: number,
    car: Array<any>
}
const initState: ICar = {
    noticeNum: 10,
    car: [
        {
            name: 'iphone',
            price: 100,
            num: 1
        }
    ]
}
const shopCarReducer = (preState = initState, action: IAction)=>{
    const {type, payload} = action
    switch(type){
        case 'add1':
            return {...preState, car: preState.car.push(payload)};
        default:
            return preState;
    }
}

export default shopCarReducer;