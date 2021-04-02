exports.getRandom = (min = 1000,max = 9999)=>{
    return Math.round(Math.random() * max) + min;
} 