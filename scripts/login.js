const login=()=>{
    const email=$('#email').val();
    const password=$('#password').val();
    
        firebase
        .auth()
        .signInWithEmailAndPassword(email,password)
        .then((cred)=>{
            window.location.replace("dashbord.html");
        })
        .catch((error)=>{
            console.log(error);
        })
};
const createAnAccount=()=>{
    window.location.replace("register.html");
};