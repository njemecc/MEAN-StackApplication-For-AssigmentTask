# MEAN-StackApplication-For-AssigmentTask
# This was the Task for the company:

![login](https://user-images.githubusercontent.com/105017037/212480641-1200d2d0-401d-4d34-ad84-ec8e912b837a.PNG)


![register](https://user-images.githubusercontent.com/105017037/212480662-7e636057-235a-41ce-97da-7f402c81742e.PNG)

![wordCounter](https://user-images.githubusercontent.com/105017037/212480694-7a063df6-d2e3-47a2-81a8-12f4be3f54ca.PNG)

![finalCounter](https://user-images.githubusercontent.com/105017037/212480703-0e9b66dc-caed-4443-8fc6-5e4d9a730703.PNG)

#The task:

# Application web frontend + API backend
An application must be created as a combination of an API backend and a 
web frontend with these functions in two versions:
1. user login (version 1, version 2)
2. user text input only alphabet (version 1)
3. user text input alphabet + numbers (version 2)
4. calculation of amount of words (version 1, version 2)
5. calculation of palindrome words (version 1)
6. calculation of numbers inside the text (version 2)
The **result** expected is:
- web server that runs on localhost:4000, available web application open 
browser at localhost:4000/
- authentication and protection of frontend routes and API for function 
2,3,4,5,6
- validation of inputs and display of errors on web frontend
- Correct functionality against different inputs
## Web frontend
- Angular application (version >= 13)
- Two routes:
 - Login
 - Words counter (protected)
- application will run in an environment with internet connection
- Two languages available for the users (English, German)
- Errors coming from API response must be displayed as toaster/snackbar 
for 3s.
### Login / Anmelden
User must be able to enter two text inputs, username and password, press 
a button and going automatically to the next page on success.
- username (required): field must accept a text input between 4 and 20 
chars. Spaces at end and beginning must be corrected in behalf of users, 
no space allowed between words
 - English: Username
 - German: Benutzername
- password (required): field must accept a text input between 8 - 25 
chars.
 - English: Password
 - German: Kennwort
Login button text:
 - English: Login
 - German: Anmelden
Validation errors to be displayed to user:
- username:
 - English: Please enter a valid first name with 4 to 20 letters.
 - German: Bitte geben Sie einen gültigen Vornamen mit 4 bis 20 Zeichen 
ein.
- password:
 - English: Please enter a valid first name with 8 to 25 letters.
 - German: Bitte geben Sie einen gültigen Vornamen mit 8 bis 25 Zeichen 
ein.
- empty field(s):
 - English: Please fill all required fields.
 - German: Bitte füllen Sie alle benötigten Felder aus. 
API errors:
- User not existing / not valid field:
 - English: Invalid user credentials.
 - German: Ungültige Benutzeranmeldeinformationen.
### Words counter / Wörter Anzahl
User must be successfully logged in to enter in this page, be able to 
enter one single text field, press a button and see the amount of words 
entered below the text input. Pressing another button cleans the input 
and the previous calculation.
- Text input: string between 10 - 390 chars, one space allowed between 
words, spaces at end and beginning must be corrected in behalf of users.
 - version 1: only alphabet allowed (no underscore)
 - version 2: alphabet and numbers allowed (no underscore)
 - English: Text
 - German: Text
- Submit button:
 - English: Calculate
 - German: Berechnen
- Clear button: 
 - English: Cancel
 - German: Löschen
- Words counter:
 - English: Words amount:
 - German: Wörter Anzahl:
- Palindrome words counter:
 - English: Palindrome words amount:
 - German: Palindrom Wörter Anzahl:
- Numbers counter:
 - English: Numbers amount:
 - German: Zahlen Anzahl:
Validation errors to be displayed to user:
- too short too long text entered
 - English: Please enter a valid text with 10 to 390 chars.
 - German: Bitte geben Sie einen gültigen Text mit 10 bis 390 Zeichen 
ein.
- not allowed chars version 1:
 - English: Please enter alphabet only letters.
 - German: Bitte geben Sie nur Buchstaben des Alphabets ein.
- not allowed chars version 2:
 - English: Please enter alphabet letters and numbers only.
 - German: Bitte geben Sie nur Buchstaben und Zahlen ein.
API Errors in this case are the same as the above ones, not necessary to 
display in a toaster/snackbar, just display as the above.
### Required styling
- User MUST see a centered card with necessary fields for both pages
- Colors:
 - primary: #002850
 - accent: #1496b4 (only for button hover effect)
 - text color: #FAFAFA (dark backgrounds) #002850 (light backgrounds) 
 - field error text: #cc0000
 - snackbar background error: #cc0000
 - snackbar text: #FAFAFA
Everything not fixed above, can be done as wanted.
## API Backend
API backend expose to the frontend all necessary HTTP endpoints with 
proper HTTP methods for these actions of the user:
- login
- calculate (protected)
Allowed frameworks library with relative middlewares eventually (choose 
one):
 - Express.js
 - uWebsockets.js
Users allowed to login can be on a file loaded at start.
### Users
| Username | Password |
|--- |--- |
| John | Password@1 |
| Aldo | canePassword#2 |
| Juan | hermanO?123 |
All password must be saved in the file as sha256 hash.
### Login
Endpoint must accept only two properties:
- username: validation as for frontend above.
- password (clear text): Validation as for frontend above.
Password check must be against sha256 hash.
An error must be sent in the response for user not existing or invalid 
property.
### Calculate
Endpoint must be protected, only authenticated user are allowed to 
consume it, and must accept only one property:
- text input: validation as frontend above.
The calculation must follow these rules:
- one word has one white space before and one white space after
- one word has a punctuation before (with or without space) and a 
punctuation after (without space)
- a palindrome word reads the same backwards as forwards, i.e: kayak, 
otto, deed, noon...
- one word containing numbers must not be calculated as a word
- numbers must be counted as single digits, i.e.:
 - " word123" contains 3 numbers
 - "12aki 9999" contains 6 numbers
## Notes
German alphabet contains some special chars 
https://en.wikipedia.org/wiki/German_orthography#Alphabet
## Inputs examples
### Login:
```
username: John
password: Password@1
```
```
username: John
password password
```
### Text field
```
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dapibus eu 
nibh a volutpat. Vestibulum eu mauris porta, iaculis elit quis, venenatis 
nunc. Ut eu orci id ipsum porttitor blandit. Vestibulum rutrum ipsum ut 
ante congue vulputate. Nullam rhoncus urna vel massa dignissim congue. 
Proin porta ipsum a sodales pretium. Quisque lacinia justo quis justo 
vestibulum pretium.
```
```
Lorem ipsum dolor sit amet, consectetur11 adipiscing elit. Sed dapibus eu 
nibh a volutpat. Vestibulum eu mauris porta, iaculis elit quis, venenatis 
nunc. Ut eu orci id ipsum porttitor blandit. Vestibulum rutrum ipsum ut 
ante congue vulputate. Nullam rhoncus urna vel massa dignissim congue. 
Proin porta ipsum a sodales pretium.
```
```
Fusce mattis 2magna eget diam feugiat, vel convallis ipsum placerat. 
Nullam a enim mi. Duis lacus quam, repaper vulputate vel vulputate eget, 
pulvinar sit amet nibh. 123Ut ullamcorper pharetra neque quis venenatis. 
Donec eget maximus augue, eu commodo 4urna.
```
```
Deutsches Ipsum Dolor deserunt schnell has Knappwurst Tollit Schnaps ius 
Hochzeit Saepe Apfelstrudel elaboraret Fußballweltmeisterschaft ne, bitte 
eu Audi pertinax, schnell eripuit über no Knappwurst Diam genau no 
Aufenthaltsgenehmigung eos Schnaps suscipit Schmetterling Eam Welt 
offendit Oktoberfest ad Ich bin ein Berliner voluptatibus Köln ad Bildung 
consul Brezel vix.

