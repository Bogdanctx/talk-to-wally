window.onload = function() {

    document.getElementById("last-connection").innerHTML = `Long time no see! Last time you visited Wally was ${localStorage.getItem('last-connected')}`;

    function updateWallStatus() {
        let status = document.getElementById("cbh-status");
        
        let chance = Math.random();
    
        if(chance < 0.3) {
            status.innerHTML = "Offline";
            status.style.color = "gray";
        }
        else if(0.3 <= chance && chance <= 0.6) {
            status.innerHTML = "Do not disturb";
            status.style.color = "red";
        }
        else {
            status.innerHTML = "Online";
            status.style.color = "lightgreen";
        }
    }
    
    setInterval(updateWallStatus, 10000);
}

function createMessageContainer(name, message) {
    const msg = new Message(message, name);
    var cbMessages = document.getElementById('cb-messages');
    cbMessages.appendChild(msg.getMessage());
}

function sendMessage() {
    let input = document.getElementById("cbf-input");
    let message = input.value;

    createMessageContainer(username, message);

    let wallStatus = document.getElementById("cbh-status").innerHTML;
    if(Math.random() < 0.2 && wallStatus === 'Online') {
        createMessageContainer('Wally', '...');
    }
}

class Message {
    constructor(message, name) {
        this.message = message;
        this.name = name;
        this.avatar = `../assets/${name}.png`
        this.isWall = false;

        if(name !== username) {
            this.isWall = true;
        }
    }

    getMessage() {

        // Create the main div element with the class 'cbm-box'
        this.box = document.createElement('div');
        this.box.className = 'cbm-box';

        var cbmWrapper = document.createElement('div');

        // Create the avatar image element with the class 'cbm-message-avatar'
        var avatarImg = document.createElement('img');
        avatarImg.className = 'cbm-message-avatar';
        avatarImg.src = this.avatar;
        avatarImg.alt = `avatar_${this.name}`;

        // Create the helper div element with the class 'cbm-helper'
        var cbmHelper = document.createElement('div');

        // Create the h2 element for the user name with the class 'cbm-user-name'
        var userName = document.createElement('h2');
        userName.className = 'cbm-user-name';
        userName.textContent = this.name;
        
        // Create the h2 element for the user message with the class 'cbm-user-message'
        var userMessage = document.createElement('h2');
        userMessage.className = 'cbm-user-message';
        userMessage.textContent = this.message;
    
        // Appends order and 

        this.box.appendChild(cbmWrapper);

        if(this.isWall) {
            cbmWrapper.classList.add('cbm-wrapper', 'cbm-wrapper-wally-case');
            cbmHelper.classList.add('cbm-helper', 'wally-message');
        
            cbmWrapper.appendChild(cbmHelper);
            cbmWrapper.appendChild(avatarImg);
        }
        else {
            cbmWrapper.className = 'cbm-wrapper';
            cbmHelper.className = 'cbm-helper';

            cbmWrapper.appendChild(avatarImg);
            cbmWrapper.appendChild(cbmHelper);
        }

        cbmHelper.appendChild(userName);
        cbmHelper.appendChild(userMessage);    
    
        return this.box;
    }
}

function disconnect() {
    const monthsAbbreviations = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = today.getMonth(); // Luniile sunt indexate de la 0
    const year = today.getFullYear();

    const hours = String(today.getHours()).padStart(2, '0');
    const minutes = String(today.getMinutes()).padStart(2, '0');
    const seconds = String(today.getSeconds()).padStart(2, '0');

    let date = `${day} ${monthsAbbreviations[month]} ${year}, ${hours}:${minutes}:${seconds}`;

    localStorage.setItem("last-connected", date);

    window.location.href = "http://localhost:8000";
}

function clearChat() {
    document.getElementById("cb-messages").innerHTML = '';
}