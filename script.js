let prompt=document.querySelector("#prompt")
let chatContainer=document.querySelector(".chat-container")
const Api_Url="https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=AIzaSyBC-_lIgqt8f-oHD9ej-i5CkoqCBbAUFz4"
let user={
    data:null,
}
async function generateResponse(aiChatBox){
let text=aiChatBox.querySelector(".ai-chat-area")
    let RequestOption={
        method:"POST",
        headers:{'Content-Type': 'application/json'},
        body:JSON.stringify({
            "contents": [
      {
        "parts": [
          {
            "text":user.data
          }
        ]
      }
    ]
        })
    }
    try{
    let response=await fetch(Api_Url,RequestOption)
    let data=await response.json()
    let apiResponse=data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g,"$1").trim()
    console.log(apiResponse);
    text.innerHTML=apiResponse
    }
    catch(error){
        console.log(error)

    }
    finally{
        chatContainer.scrollTo({top:chatContainer.scrollHeight,behaviour:"smooth"})
    }
}
function createChatbox(html,classes){
    let div=document.createElement("div")
    div.innerHTML=html
    div.classList.add(classes)
    return div
}

function handleChatResponse(message){
    user.data=message
    let html=`<div class="user-chat-box">
    <img src="" alt="" id="user-image" width="50">
    <div class="user-chat-area">
    ${user.data}
    </div>`
    prompt.value=""
    let userChatBox=createChatbox(html,"user-chat-box")
    chatContainer.appendChild(userChatBox)
    chatContainer.scrollTo({top:chatContainer.scrollHeight,behaviour:"smooth"})

    setTimeout(()=>{
    let html=`<img src="" alt="" id="Ai-image" width="50">
    <div class="ai-chat-area">
    </div>`
    let aiChatBox=createChatbox(html,"ai-chat-box")
    chatContainer.appendChild(aiChatBox)
    generateResponse(aiChatBox)
    },50)
}
prompt.addEventListener("keydown",(e)=>{
    if(e.key=="Enter"){
        handleChatResponse(prompt.value)

    }

})