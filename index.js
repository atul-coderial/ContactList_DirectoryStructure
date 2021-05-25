//Load the express library
const express = require('express');
//Load the path library
const path = require('path');
//Assign the port no.
const port = 8004;
//Calling the database connection
const db = require('./config/mongoose');
//Calling the models
const Contact = require('./models/contact');
//call the express functionality in app
const app = express();

//Call the views with ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'view'));

//Form data is URL encoded to read an attributes of form
app.use(express.urlencoded());

//Adding assets in Middleware of webpage.
app.use(express.static('assets'));

//Rendering on the Home Page
app.get('/', function(req, res){

    Contact.find({}, function(err, contacts){
        if(err){
            console.log('Error in fetching data');
            return;
        }
        return res.render('home', {
            title: 'Contact_list_with_database',
            contact_list: contacts
        });
    });
    
});

//Form Submitted data is called
app.post('/submitted', function(req, res){
    /*console.log(req.body.name);
    console.log(req.body.phone);*/

    //contactList.push(req.body);

    Contact.create({
        name: req.body.name,
        phone: req.body.phone
    }, function(error, newContact){
        if(error){
            console.log('Error to creating the contactlist', errror);
            return;
        }
        console.log('********************', newContact);
        return res.redirect('back');
    });
})

//Contact_list is Deleted from the Directories
app.get('/delete_contact/', function(req, res){
    
    let id = req.query.id;
    console.log(id);
    Contact.findByIdAndDelete(id, function(err){
        if(err){
            console.log('Error is found to delte the data', err);
            return;
        }
        return res.redirect('back');
    })

})
app.get('/404', function(req, res){
    return res.render('404', {
        title: "Error Found!"
    });
});

app.listen(port, function(err){
    if(err){
        console.log('Error is found in server listing');
    }
    console.log('Successfully connected to the server:', port);
});
