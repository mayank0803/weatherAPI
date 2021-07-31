const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));


app.get("/", function (req, res) {
	res.sendFile(__dirname + "/index.html");
});
app.post("/", function (req, res) {
	const query = req.body.cityName;
	const appkey = "e2ee4e8cbbb92a1dfe112040ef535278";
	const met = "metric";
	const url =
		"https://api.openweathermap.org/data/2.5/weather?q=" +
		query +
		"&appid=" +
		appkey +
		"&units=" +
		met;
	https.get(url, function (response) {
		console.log(response.statusCode);
		response.on("data", function (data) {
			const weatherData = JSON.parse(data);
			const temp = weatherData.main.temp;
			const description = weatherData.weather[0].description;
			const icon = weatherData.weather[0].icon;
			const imgurl = " http://openweathermap.org/img/wn/" + icon + "@2x.png";
			res.write(
				"<h1>Todays temperature in " +
					query +
					" is " +
					temp +
					"  degree Celsius</h1>",
			);
			res.write("<p> today's weather description is " + description);
			res.write("<img src=" + imgurl + ">");
			res.send();
		});
	});
});
app.listen(3000, function () {
	console.log("U are in 3000");
});
