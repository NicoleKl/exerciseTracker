# Exercise Tracker
To start tracker run `npm start`

# Add new user
<img width="350" alt="Снимок экрана 2022-11-07 в 12 01 23 PM" src="https://user-images.githubusercontent.com/67655488/200403554-417f6ac9-4a91-457b-8044-afc071103b89.png">

username should be longer than 3 symbols and be unique

response: `{"id":34,"username":"username99"}`

# Get all users
To get array of all users use button "Get all users"

response: `[{"id":1,"username":"user1"},...,{"id":34,"username":"username99"}]`

<img width="350" alt="Снимок экрана 2022-11-07 в 12 01 57 PM" src="https://user-images.githubusercontent.com/67655488/200403639-7bb759d3-6179-4c8e-85c7-d877f58794f2.png">

# Add exercise for user
- You should use id of previously created user
- Add description to exercise (should be longer than 3 symbols)
- Duration should be a number, that is bigger than 0
- Date should be YYYY-MM-DD format/if date is omitted, current date will be used

<img width="346" alt="Снимок экрана 2022-11-07 в 12 05 59 PM" src="https://user-images.githubusercontent.com/67655488/200404382-5ca7befc-2e03-4b24-8a38-2909c9b0f104.png">

response: `{"userId":34,"exerciseId":36,"description":"smth to do","duration":55,"date":"2022-11-07"}`

# Get exercises for user
- You should use id of existing user
- From and to dates(optional) should be YYYY-MM-DD formats
- Limit is also optional. If it's specified, should be a number, that is bigger than 0.

<img width="340" alt="Снимок экрана 2022-11-07 в 12 16 38 PM" src="https://user-images.githubusercontent.com/67655488/200406360-1c697c4d-fb23-4af8-8900-b0e554a0f68e.png">

response: `{"logs":[{"id":36,"userId":"34","description":"smth to do","duration":55,"date":"2022-11-07"},{"id":37,"userId":"34","description":"smth else to do","duration":15,"date":"2022-11-08"}],"count":2}`
