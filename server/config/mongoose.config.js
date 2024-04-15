const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/JVMusers", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("Now looking for 🔑 Street Parkers🔑 in the wild!!"))
    .catch(err => console.log("🚫 Where Is The Database?? What's The WOD?? 🚫",err))