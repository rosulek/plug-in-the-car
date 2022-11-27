# plug in the car!

Checks your Hyundai/Kia EV status using BlueLink,
and sends an email (via Gmail) if the battery is low
and the car is not charging.

## Installation

1. `npm install bluelinky nodemailer dotenv`

2. Create an application password for your Gmail account.

   * Go to https://myaccount.google.com/security
   * Ensure that 2-step verification is enabled
   * Go to "app passwords" and create a new one

3. Create a file `.env` with the following:

    GMAIL_USER=xxx@gmail.com
    GMAIL_PASSWORD=xxx # application password you created above
    EMAIL_TO='address1:address2:...'

    BLUELINK_USERNAME=xxx
    BLUELINK_PASSWORD=xxx
    BLUELINK_PIN=xxx
    BLUELINK_BRAND=hyundai # 'hyundai' or 'kia'
    BLUELINK_REGION=US # 'US' or 'CA' or 'EU'

    CAR_VIN=xxx
    CAR_MODEL=xxx # display name used in the email
    CAR_SOC_THRESHOLD=33 # alert when battery is below this percentage

4. Run as `node plug-in-the-car.js`, perhaps from a cron job
