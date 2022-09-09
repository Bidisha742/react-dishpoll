# react-dishpoll

App Overview:

In this app, users can login from the login page, and upon verification they will see a list of dishes in the tab one for ranking and a submit button. Once the user has ranked the three dishes of his/her choice, he'll be able to submit it. Upon submission, his choices will be accepted and dishes will be ranked accordingly. In tab two, the user will be able to see the dish leaderboard and their entries for respective ranks. At any point of time, the user can change their choices and the rankings will be updated accordingly.


Technical Details: 

1. On load, the app will check if the user was previously logged in from the browser. If yes, they will be automatically redirected to the Home page with the tabs. If not they will have to login,on login the user credentials will be verified and user will be logged in. I have used REDUX to maintain the login state and browser LOCALSTORAGE to store the user data.


2. Next I am using the LOCALSTORAGE for storing the users' dish selection (Rank one, Rank two, Ranna three) and the points for each of the dish upon choice submission.

3. In Tab One, the logged in user must choose three food as Rank One, Rank two and Rank three to proceed with the Submission. Otherwise the submit button will be disabled.

4. Once the user has submitted his choices, the users data stored in LOCALSTORAGE, will be updated with his/her choices and the dishes will be updated with correct points given to them for the choices based on ranks.

5. The Home page is consisted of two child components Tab One and Tab Two.

6. In Tab Two, a ranked dish list has been displayed sorted based on points. The user can also see their choices in the list marked in 🔵 (Rank one), 🟢 (Rank two) and 🔴(Rank three).

7. The user at any point can change their choices in Tab One and see the updated ranked list in Tab Two.


8. As we do not have an actual database, I have used the LOCALSTORAGE as one.

9. The User can logout from the logout button in the navigation bar. 
