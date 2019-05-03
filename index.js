var express = require('express');
var path = require('path');
var fs = require('fs');
var bodyParser = require('body-parser');
var prodSpec = require('./product.json');

var app = express();
app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", function (req, res) {
    res.render('index', {
        title: "飲料",
        prodList: prodSpec.products
    });
});

app.post("/", function (req, res) {
    var list = [];
    for (var i = 0; i < prodSpec.products.length; i++) {
        var id = prodSpec.products[i].id;
        var item = {};
        if (req.body[id+"Sum"] > 0) {
            item.name = prodSpec.products[i].name;            
            item.size = (req.body[id+"Size"] == "M") ? "中杯(M)" : "大杯(L)";
            item.price = req.body[id+"Price"];
            item.amount = req.body[id+"Amount"];
            item.sum = req.body[id+"Sum"];
            item.note = "";
            if (req.body[id+"Ice"] == "1")            
                item.note = "少冰 ";
            else if (req.body[id+"Ice"] == "2")
                item.note = "去冰 ";

            if (req.body[id+"Sugar"] == "1")            
                item.note += "減糖";
            else if (req.body[id+"Sugar"] == "2")            
                item.note += "微糖";
            else if (req.body[id+"Sugar"] == "3")            
                item.note += "無糖";

            if (item.note == "") item.note = "正常";

            list.push(item);
        }
    }
    res.render('order', {
        title: "訂單",
        prodList: list
    });
});

var port = 3000;
app.listen(port, function () {
    console.log("Listening on port " + port);
});
