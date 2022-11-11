import styles from "@/assets/styles/sass/app.module.scss";
import React, { ChangeEvent, useRef, useState } from "react";
import { connect } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import { Dispatch } from "redux";
const Dialog = React.lazy(()=> import('@/component/Dialog/index'))
function Home(props:any) {
    console.log(props)
    let data  = useRouteMatch()
    console.log(data)
    function fn() {
        props.test(1000)
    }

    function input(val: number, e:ChangeEvent): void{
        console.log(val)
        console.log(e)
    }

    function clickEvent(): void{
        const el = fileInputRef.current;
        console.log(el?.files)
        console.log(el)
    }
    const [val, setVal] = useState('默认内容')
    let fileInputRef = React.createRef<HTMLInputElement>()
    let inputRef = useRef<HTMLInputElement | null>(null)
    return (
        <div className={styles.body}>
            <React.Suspense fallback={ <div>loading</div>}>
                <Dialog name="wangqiang" age={10} setName={()=>{}}>
                    123
                </Dialog>
                Home页面
            { props.count.age}
            <button onClick={fn}></button>
            </React.Suspense>
            <input type="file" ref={fileInputRef}/>
            <button onClick={clickEvent}>alert file</button>

            <div>--------------------------</div>
            <div>
                <input type="text" defaultValue={val} ref={inputRef} onChange={(e)=>input(props, e)} />
            </div>
        </div>
    )
}
const mapStateToProps = (state: { count: ICount }) => {
    return {
        count: state.count
    }
}

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        test: (num: number) => dispatch({
            type: 'add',
            payload: num
        })
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Home)