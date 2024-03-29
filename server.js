const http = require('http');
const fs = require('fs');
const path = require('path');
const formidable = require('formidable');
const fetch = require('node-fetch');


http.createServer(function (req, res) {
    if(req.url == "/"){
        // home page
        console.log("requesting index");

        let index = "registration.html";
        fs.readFile(index, function (err, txt) {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(txt);
            res.end();
        });
    }
    else if (req.url == "/registration") {
        // venue page
        console.log("requesting venue");

        if (req.method.toLowerCase() == "post") {
            var form = new formidable.IncomingForm();

            form.parse(req, async function (err, fields, files) {
                if (err) {console.log(err);}
                console.log(fields["Name"].toString());
                await fetch("https://api.apispreadsheets.com/data/UE2ctyuGmhdA40g9/", {
	            method: "POST",
	            body: JSON.stringify({"data": {"0":fields["Name"],"1":fields["Email"],"2":fields["Phone_number"],
                "3":fields["Venue"],"4":fields["Time"],"5":fields["Discovery"], "6":fields["Date_Time_added"]}}),
                }).then(res =>{
	            if (res.status === 201){
		            // SUCCESS
                    console.log("Succ");
                    result = 1;

	                }
	            else{
		            // ERROR
                    console.log("Fail");
                    result = 0;
	                }
                })

            });

                let index = "Thanks.html";
                    fs.readFile(index, function (err, txt) {
                        res.writeHead(200, {'Content-Type': 'text/html'});
                        res.write(txt);
                        res.end();
                    });
        }
    }

    else {
        // On instagram update problem page
        let index = "registration.html";
        fs.readFile(index, function (err, txt) {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(txt);
            res.end();
        });
    }
}).listen(process.env.PORT || 8081);