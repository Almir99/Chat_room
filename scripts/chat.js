const  chatList = document.querySelector(".chat-list");
const  newChatForm = document.querySelector(".new-chat");
const  newNameForm = document.querySelector(".new-name");
const  updateMesg = document.querySelector(".update-mesg");
const  rooms = document.querySelector(".chat-rooms");

const chatUI = new ChatUI(chatList);

// Import the functions you need from the SDKs you need
import {initializeApp} from "https://www.gstatic.com/firebasejs/9.9.1/firebase-app.js";
import {
    getFirestore,
    collection,
    serverTimestamp,
    addDoc,
    onSnapshot,
    query,
    where,
    orderBy
} from "https://www.gstatic.com/firebasejs/9.9.1/firebase-firestore.js";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDy84VBb2CmpLpplZxj1UZEDm_ZrN1-d9k",
    authDomain: "project2-5bbe2.firebaseapp.com",
    projectId: "project2-5bbe2",
    storageBucket: "project2-5bbe2.appspot.com",
    messagingSenderId: "808843848419",
    appId: "1:808843848419:web:ce7015a37055949b2673d6",
    measurementId: "G-GWXZHJ01H4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
class Chatroom {
    constructor(room, username) {
        this.room = room;
        this.username = username;
        this.chats = collection(db, 'chats');
        this.unsub;
    }

    async addChat(message) {
        const docRef = await addDoc(collection(db, "chats"), {
            message: message,
            username: this.username,
            room: this.room,
            created_at: serverTimestamp()
        });
    }
    getChats(callback) {

        const que = query(this.chats, where("room", "==", this.room), orderBy("created_at"))
            this.unsub = onSnapshot(que , (snapshot) => {
                const chat = []
                snapshot.docs.forEach((change) => {
                    chat.push(change.data());
                })
                callback(chat)
            })
    }

    updateName(username) {
        this.username = username;
        localStorage.setItem("username", username);
    }

    updateRoom(room) {
        this.room = room;
        console.log("room updated");
        if (this.unsub) {
            this.unsub();
        }
    }
}

const username = localStorage.username ? localStorage.username : "User";
const chatroom = new Chatroom("general", username);

newChatForm.addEventListener("submit", e=>{
    e.preventDefault();
    const  message = newChatForm.message.value.trim();
    chatroom.addChat(message)
        .then(() => newChatForm.message.value = "")
        .catch(err => console.log(err));
})
newNameForm.addEventListener("submit", e=>{
    e.preventDefault();
    const  newName = newNameForm.name.value.trim();
    chatroom.updateName(newName)
    newNameForm.name.value = "";
    updateMesg.innerHTML = `Your name was updated to ${newName}`
    setTimeout(() =>{updateMesg.innerHTML = ""},3000)

})
rooms.addEventListener("click", e=>{
    if (e.target.tagName === "BUTTON"){
        chatUI.clear();
        chatroom.updateRoom(e.target.getAttribute("id"))
        chatroom.getChats(chat =>{
            chatUI.render(chat)
        });
    }

})
chatroom.getChats((data) => {
    chatUI.render(data)
})




