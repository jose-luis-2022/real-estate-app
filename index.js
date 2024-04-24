const app = require("./app/app");

const PORT = app.get("PORT");

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});