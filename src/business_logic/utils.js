const formattingOptions = { year: 'numeric', month: 'numeric', day: 'numeric' };

const dateFormatter = Intl.DateTimeFormat('it-IT', formattingOptions);

const baseUrl = "http://localhost:4000";


module.exports = {dateFormatter, baseUrl};
