const express = require('express')
const cors = require('cors')
const contactsRouter = require('./app/routers/contact.router');
const ApiError = require('./app/api-error')

const app = express()

app.use(cors());
app.use(express.json());

app.get('/',(req, res) => {
    res.json({ message: "Welcome to contact book application."})
})


app.use("/api/contacts", contactsRouter);

//handle 404 response
app.use((req, res, next) => { 
    //Code ở đây sẽ chạy khi không có route được định nghĩa nào khớp
    // với yêu cầu. Gọi next() để chuyển đến middleware xử lý lỗi
    return next(new ApiError(404, "Resource not found"));
});

//define error-handling middleware last, after other app.use() and route calls
app.use((err, req, res, next) => {
    //Middle ware xử lí lỗi tập trung.
    //Trong các đoạn code xử lí ở các route, gọi next(error) sẽ chuyển đên 
    //middleware xử lí lỗi này.
    return res.status(err.statusCode || 500).json({
        message: err.message || "Internal Server Error"
    })
})

module.exports = app;