const AuthController = require('./controllers/AuthController')
const Events = require('./controllers/Events')
const Blogs = require('./controllers/Blogs')
const Register = require('./controllers/Register')
const GlimpseController = require('./controllers/GlimpseController')
const upload = require('./middleware/upload')
const auth = require('./middleware/auth')
const blog = require('./middleware/blog')
const event = require('./middleware/event')

module.exports = (app) => {
    app.get('/api/hello', (req,res) => {res.json('Hello World')}) // Very hard to test and change

    // Auth
    app.post('/api/register',AuthController.register) // Tested
    app.post('/api/login',AuthController.login) // Tested
    app.post('/api/verify-token',AuthController.verifyToken) // Tested
    app.post('/api/user',AuthController.getUser) // Tested

    //Events Paths
    app.get('/api/events', Events.getEvents); // Tested
    app.post('/api/events', auth.loginRequired, event.isMember, upload.single('COC_Event'), Events.uploadEvent)
    app.put('/api/events/:id', auth.loginRequired, event.isMember, upload.single('COC_Event'),Events.updateEvent);
    app.put('/api/events/form', auth.loginRequired, event.isMember, Events.addForm) // Tested
    app.get('/api/events/:id', Events.getEventById); // Tested
    app.post('/api/events/reminder', Events.addReminder);
    app.delete('/api/events/reminder/:id', Events.cancelReminder);
    app.delete('/api/events/:id', auth.loginRequired, event.isMember, Events.deleteEvent); // Tested
    

    // Registration
    app.post('/api/reg-form', Register.regForm); // Incomplete controller
    
    // Glimpses
    app.get('/api/glimpses', GlimpseController.getAllGlimpses);
    app.get('/api/glimpses/:id', GlimpseController.getGlimpse);
    app.post('/api/glimpses',GlimpseController.getPhotos);
    app.post('/api/glimpses/new', GlimpseController.addGlimpse);
    app.put('/api/glimpses/edit/:id', GlimpseController.editGlimpse);
    app.delete('/api/glimpses/delete/:id', GlimpseController.deleteGlimpse);

    // Blogs
    app.get('/api/blogs', Blogs.allBlogs); // Tested
    app.get('/api/blogs/:id', Blogs.viewBlogById); // Tested
    app.post('/api/blogs/new', auth.loginRequired, blog.isBlogAuthorized, Blogs.uploadBlog); // Tested
    app.put('/api/blogs/edit/:id', auth.loginRequired, blog.isBlogAuthorized, Blogs.editBlogById); // Tested
    app.delete('/api/blogs/delete/:id', auth.loginRequired, blog.isBlogAuthorized, Blogs.deleteBlogById); // Tested
}