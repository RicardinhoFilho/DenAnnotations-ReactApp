const checkDescription = (description)=>{

    if(description.length > 0 && description.length < 5 ){
        return  {msg:["Descrição deve possuir pelo menos 5 caractéres"], isValid:false };
    }else if(description.length > 30){
        return  {msg:["Descrição deve possuir menos que 30 caractéres"], isValid:false };
    }
    

    return   {msg:[""], isValid:true };

}

export default checkDescription;