

const showTimeFromMS = (ms)=>{
    let messageTime = new Date(ms);
    let today = new Date();
    if (messageTime.getDate() === today.getDate() && messageTime.getMonth() === today.getMonth() && messageTime.getFullYear() === today.getFullYear()) {
        return `${messageTime.toLocaleTimeString(navigator.language, {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        })}`
    } else {
        return messageTime.toLocaleDateString(
            'en-US',
            {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                hour12: true
            })
    }
}

module.exports = {
    showTimeFromMS
}