const BlueLinky = require("bluelinky");
const nodemailer = require('nodemailer');
require('dotenv').config();

// thanks https://stackoverflow.com/questions/45478293/username-and-password-not-accepted-when-using-nodemailer/45479968#45479968
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD
    }
});

async function sendmail(soc) {
    const result = await transporter.sendMail({
        to: process.env.EMAIL_TO.split(':'),
        subject: ('Plug in the ' + process.env.CAR_MODEL + '!'),
        text: ('The car is only at ' + soc + '% charge and not plugged in')
    });

    console.log(JSON.stringify(result, null, 4));
}

const client = new BlueLinky({
  username: process.env.BLUELINK_USERNAME,
  password: process.env.BLUELINK_PASSWORD,
  pin:      process.env.BLUELINK_PIN,
  brand:    process.env.BLUELINK_BRAND,
  region:   process.env.BLUELINK_REGION
});


client.on("ready", async () => {

  // helpful for debugging:
  // console.log(await client.getVehicles())

  const vehicle = client.getVehicle(process.env.CAR_VIN);
  const response = await vehicle.status();
  var soc = response.evStatus.batteryStatus;
  var charging = response.evStatus.batteryCharge;

  if (soc < process.env.CAR_SOC_THRESHOLD && !charging) {
    console.log("Needs to be plugged in!") ;
    sendmail(soc);
  } else {
    console.log(
        "OK: battery at", 
        (soc + "%"), 
        (charging ? "and charging" : "")
    );
  }
});
