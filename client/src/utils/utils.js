

const showTimeFromMS = (ms) => {
    ms = parseInt(ms)
    let messageTime = new Date(ms);
    let today = new Date();
    if (messageTime.getDate() === today.getDate() && messageTime.getMonth() === today.getMonth() && messageTime.getFullYear() === today.getFullYear()) {
        return `${messageTime.toLocaleTimeString(navigator.language, {
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        })}`
    } else if (messageTime.getMonth() === today.getMonth() && messageTime.getFullYear() === today.getFullYear()) {
        return messageTime.toLocaleDateString(
            'en-US',
            {
                month: 'short',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                hour12: true
            })
    } else if (messageTime.getMonth() !== today.getMonth() && messageTime.getFullYear() === today.getFullYear()) {
        return messageTime.toLocaleDateString(
            'en-US',
            {
                month: 'short',
                day: 'numeric',
            })
    } else {
        return messageTime.toLocaleDateString(
            'en-US',
            {
                year: 'numeric',
                month: 'short',
                // day: 'numeric',
                // hour: 'numeric',
                // minute: 'numeric',
                // hour12: true
            })
    }
}

const firstLetters = userInfo => {
    let credentials = userInfo.name.charAt(0).toUpperCase();
    credentials += userInfo.surname ? userInfo.surname.charAt(0).toUpperCase() : ''
    return credentials
}

module.exports = {
    showTimeFromMS,
    firstLetters
}