/* Global Variables */
// Personal API Key for OpenWeatherMap API
const baseURL='http://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey='&appid=1a0f79f06c21c11598920d4ee0a15968';
// const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip=';
// const apiKey = '&appid=5beb43e13dc3fa8be428191e6e50a00c';
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth()+1)+'.'+ d.getDate()+'.'+ d.getFullYear();

//select generate button and add event click
const generate=document.getElementById('generate');
generate.addEventListener('click',performAction);
function performAction(){
    const zipCode=document.getElementById('zip').value;
    const fellingContent=document.getElementById('feelings').value;
    if(zipCode==''){
        const errorMsg=document.querySelector('.error');
        errorMsg.textContent='Please Enter Zip Code in USA';
        errorMsg.style.color='red';
        zipCode.style.border='2px solid red';
    }
    else{
        getData(baseURL,zipCode,apiKey).then(function (wheatherData){
            postData('/addInfo',{date: newDate,temp: wheatherData.main.temp,content: fellingContent})
        }).then(function(sentData){
            updateUI()
        })
    }
}
//get all data from calling Api
const getData = async(baseURL,zipCode,apiKey)=>{
    const response=await fetch(baseURL + zipCode + apiKey);
    try{
        const wheatherData=await response.json();
        return wheatherData;
    }
    catch(error){
        console.log('Error',error);
    }
}
const postData = async(url='',data={})=>{
    const request=await fetch(url,{
        method: "POST",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json;charset=UTF-8"
        },
        body: JSON.stringify({
          date: data.date,
          temp: data.temp,
          content: data.content
        })
    })
    try{
        const sentData = await request.json();
        return sentData;
    }
    catch (error){
        console.log('Error',error);
    }
}
const updateUI = async()=>{
    const res = await fetch('/all');
    try{
        const data= await res.json();
        const icons=document.querySelectorAll('.icons');
        icons.forEach(icon => icon.style.opacity = '1');
        document.getElementById('date').innerHTML=data.date;
        document.getElementById('temp').innerHTML=data.temp + ' C';
        document.getElementById('content').innerHTML=data.felling;
        document.querySelector('.entry').style.display='block';
    }
    catch (error){
        console.log('Error',error);
    }

}