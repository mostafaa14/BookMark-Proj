var siteNameInput = document.getElementById("siteName");
var siteUrlInput = document.getElementById("siteUrl");

var siteContainer = []

if(localStorage.getItem("sites") != null){
    siteContainer = JSON.parse(localStorage.getItem("sites"))
    displayData()
}

function submitSite(){

    if(regexUrl() == true & regexName() == true){

        var site = {
            name: siteNameInput.value ,
            url: siteUrlInput.value
        }
    siteContainer.push(site)
    localStorage.setItem("sites" , JSON.stringify(siteContainer))
    displayData()
    clearForm()

    }

}

function displayData(){
    var box = ''
    for(var i=0; i<siteContainer.length; i++){
        box += `
        <tr>
            <td>${i+1}</td>
            <td>${siteContainer[i].name}</td>
            <td>
            <button class="btn btn-outline-success btn-sm"><a href="${siteContainer[i].url}" target="_blank"><i class="fa-solid fa-eye pe-2"></i>Visit</a></button>
            </td>
            <td>
            <button class="btn btn-outline-danger btn-sm" onclick="deleteSite(${i})"><i class="fa-solid fa-trash-can"></i> Delete</button>
            </td>
        </tr>
        `
    }
    document.getElementById("tableData").innerHTML = box
}

function deleteSite(siteNumber){
siteContainer.splice(siteNumber,1)
localStorage.setItem("sites" , JSON.stringify(siteContainer))
displayData()
}

function clearForm(){
    siteNameInput.value = "";
    siteUrlInput.value = "";
    siteNameInput.classList.remove('is-valid')
    siteUrlInput.classList.remove('is-valid')
    
}

function regexName(){
var regexName = /^[a-zA-Z]{3,20}$/
var text = siteNameInput.value
if(regexName.test(text) == true){
    siteNameInput.classList.add('is-valid');
    siteNameInput.classList.remove('is-invalid');
    return true;
}
else {
    siteNameInput.classList.add('is-invalid');
    siteNameInput.classList.remove('is-valid');
    return false;
}
}

function regexUrl(){
var regexUrl = /^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/
var text = siteUrlInput.value
if(regexUrl.test(text) == true){
    siteUrlInput.classList.add('is-valid');
    siteUrlInput.classList.remove('is-invalid');
    return true;
}
else {
    siteUrlInput.classList.add('is-invalid');
    siteUrlInput.classList.remove('is-valid');
    return false;
}
}

