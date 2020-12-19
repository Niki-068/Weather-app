console.log("client side javascript");

const fetchForcast = (address,callback)=>{
    
    const url = "/weather?address=" + address;

    fetch(url).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            console.log(data.error);
            message1.textContent = data.error;
        }
        else{
            console.log(data.location);
            console.log(data.forecast);

            message1.textContent = data.location;
            message2.textContent = "weather feels like " + data.forecast + ". Temperature is " + data.temperature;
        }
    })
})
}
const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

const message1 = document.querySelector('#message-1');
const message2 = document.querySelector('#message-2');

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    message1.textContent = "Loading..."
    message2.textContent = "";
    const location = search.value;

    fetchForcast(location);
    //console.log(location);
})