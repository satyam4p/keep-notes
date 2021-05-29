// function makeUser(){
//     return {
//         name:"john",
//         ref: function(){return this}
//     };
// }

// // let user = makeUser().ref;
// console.log(makeUser().ref().name);


let calculator = {
    read:function(){
        this.a = + prompt('a?',0);
        this.b = + prompt('b?',0);
    },
    sum:function(){
        return this.a + this.b;
    },
    mul:function(){
        return this.a * this.b;
    }
}

calculator.read();
calculator.sum();