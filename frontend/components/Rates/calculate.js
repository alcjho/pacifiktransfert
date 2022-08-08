const calculateFees = (amount, exchange_rate, fromTargetRate) => {
    if(!fromTargetRate){
        return (Number(amount) * Number(exchange_rate)).toFixed(2);
        
    }else{
        let result = (Number(amount) / Number(exchange_rate)).toFixed(2);
        if(isNaN(result)){
            return 0;
        }else{
            return (Number(amount) / Number(exchange_rate)).toFixed(2);
        }
    }
}

export default calculateFees;