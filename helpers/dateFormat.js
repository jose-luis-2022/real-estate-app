const dateFormat = date => {
    const newDate = new Date(date);
    newDate.setUTCHours(12,0,0,0);

    const options = {
        weekday: "long",
        year: "numeric",
        month:"long",
        day: "numeric"
    }

    return new Date(newDate).toLocaleDateString("en-US", options)
};

module.exports = dateFormat;