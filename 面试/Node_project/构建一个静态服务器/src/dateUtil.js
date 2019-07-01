function formatDate(time) {
    let timestamp = new Date(time);
    let year = timestamp.getFullYear();
    let month = timestamp.getMonth() + 1;
    let day = timestamp.getDate();
    let hour = timestamp.getHours();
    let minutes = timestamp.getMinutes();
    let seconds = timestamp.getSeconds();

    return `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`
}

module.exports = {
    formatDate
}