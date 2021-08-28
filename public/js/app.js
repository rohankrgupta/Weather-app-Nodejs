//console.log('Client side JS file is loaded')

const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const msgOne = document.querySelector('#Msg-1')
const msgTwo = document.querySelector('#Msg-2')

//msgOne.textContent = 'From Javascript'

weatherForm.addEventListener('submit', (e)=>{
    
    e.preventDefault();

    const address = search.value;
    
    fetch(`/weather?address=${address}`).then((res)=>{
    res.json().then((data) =>{
        if(data.error){
           return msgOne.textContent ='Invalid location';
        }
        msgOne.textContent = data.location
        msgTwo.textContent = `${data.description}. Currently it is ${data.temperature} °C out & feels like ${(data.feelslike)} °C`
    });
});
   
});
