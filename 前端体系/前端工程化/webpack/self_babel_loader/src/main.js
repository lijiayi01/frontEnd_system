function a(){
    
}


class People{
    constructor(name, age){
        this.name = name;
        this.age = age
    }


    getName(){
        console.log(this.name)
    }
}




class Man  extends People{
    constructor(name, age){
        super(name, age)
    }
}

let p = new Man('111',18)
console.log(p)