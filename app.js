import express from 'express';
import expressEjsLayouts from 'express-ejs-layouts';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import customerUserRoute from './features/customer/users/user.Route.js';
import adminRoutes from './features/admin/users/admin.Route.js';

const app = express();


// =======================
// CORS CONFIG
// =======================

const corsOptions = {
    origin: 'http://127.0.0.1:5500',
    credentials: true
};

app.use(cors(corsOptions));


// =======================
// BODY PARSER
// =======================

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// =======================
// COOKIE
// =======================

app.use(cookieParser());


// =======================
// EJS CONFIG
// =======================

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(expressEjsLayouts);

app.set('layout', 'commonLayout/layout');


// =======================
// STATIC FILES
// =======================

app.use(express.static('./public'));

app.use('/uploads', express.static('uploads'));


// =======================
// GLOBAL EJS VARIABLES
// =======================

app.use((req, res, next) => {

    res.locals.title = "FitConnect";

    // default role
    res.locals.userType = "customer";


    // if middleware sets user information
    if(req.user && req.user.role){
        res.locals.userType = req.user.role;
    }


    next();

});


// =======================
// ROUTES
// =======================

app.use('/customerUser', customerUserRoute);

app.use('/adminUser', adminRoutes);


// =======================
// HOME ROUTE
// =======================

app.get('/', (req, res) => {

res.redirect('/customerUser/signin')
})


// =======================
// 404 HANDLER
// =======================

app.use((req,res)=>{

    res.status(404).send("Page Not Found");

});


export default app;