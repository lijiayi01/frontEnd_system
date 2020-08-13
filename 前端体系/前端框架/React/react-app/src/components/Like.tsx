import React, {useState} from "react";

const LikeState: React.FunctionComponent = (prop)=>{

    const [num, setNum] = useState(0);

    return (
        <div>
            <button onClick={()=>{setNum(num+1)}}>{num}</button>
        </div>
    )
}


export default LikeState