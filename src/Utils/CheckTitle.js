 const checkTitle = (title)=>{

    if(title.length < 3){
        return {msg:["Título deve possuir pelo menos 3 caractéres"], isValid:false };
    }else if(title.length > 15){
        return {msg:["Título deve possuir menos que 16 caractéres"], isValid:false };
    }
    

    return  {msg:[""], isValid:true };;

}

export default checkTitle;