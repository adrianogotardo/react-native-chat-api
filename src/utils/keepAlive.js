import axios from 'axios';

async function keepAlive() {
    try {
        await axios.get(process.env.KEEPALIVE_URL);
    } catch(error) {
        console.log(error);
    }
}

function startKeepAlive() {
    if(process.env.KEEPALIVE_URL){
        setInterval(keepAlive, 30000);
    } else {
        console.log("It seems like KEEPALIVE_URL is not defined. Keep-alive requests will not be sent.")
    }
}

export { startKeepAlive }