# Banking Application

This project was chosen as my Non Exam Assessment coursework for Computer Science (2021-2022) A-level. Although the project isn't as polished as it can be,
the quality of code written has improved significantly towards the end of the project. Due to deadlines of the project, colour scheme and design language
is not 100% consistent nor is it meant to be. This is my first website to
authentication(using Azure AAD), working with Angular and .NET. Therefore this is almost as a big 
reference project I will build upon in other projects.

Unfortunately, there is no live demo for this website, as everything was hosted
on Microsoft Azure (with Log Analytics) and it was not worth keeping it up.

## Objectives

Before we started coding our project idea, we had to do some
planning and set ourselves some goals. Listed below, are my goals. 
My planning pdf with various diagrams can be seen [here](/assets/projects/banking-application/diagrams.pdf).

### User

- User will be able to login using his credentials.
- User entered email should be verified with a confirmation email.
- User should be able to change their password (Azure B2C).
- User should be able to setup 2 Factor Authentication (2FA).
- Support user management using Azure Active Directories.
- Use authentication standard of OpenID / OAuth
- Customers logged in should have a persistent access to the navbar.
- Edit details of existing payee.
- View transaction history
- Filter transaction history
- Search transaction history
- Personal details can be viewed censored, so that it can be viewed in libraries or any other public places.
- View when their details was last changed, and by whom it was changed.

### Teller

- Deposit/Withdraw money using account number.

### Officer

- Create customer account.
- View transaction history of customer.
- View accounts table.

### Manager

- Should be able to create Teller and Branch officer accounts.
- View all users registered - customers, tellers and branch officers.

## Banking Application - [front end](https://github.com/hegde-atri/BankingApplication-fe)

This project is made using the Angular framework. For the theming and design of the website, I decided to try using Angular material which looked professional and seemed
to have all the components I needed. I have also implemented graphs and steppers in reactive forms. The forms also 
feature validation and validation hints. Most buttons also have tooltips.

I've learnt a lot of web development skills with this, such as 
- Calling CRUD API's (Handling Promises).
- Formatting data into something visually appealing.
- Pagination in tables.
- Graphs from user data.
- Routing and guarding routes (i.e. block manager pages when logged in as a customer).
- Searching and filtering through items to be displaced.
- Dynamically display items based on user data.

The Azure B2C authentication can be done in 2 different methods, either through a popup or through redirection, both methods store a cookie
to remember session details (i.e. keeps you logged in). I have also made use of a JWT 
token, and decoded it to get first name and email displayed on the navbar.

## Banking Application - [back end](https://github.com/hegde-atri/BankingApplication-be)

The backend solution is comprised of 2 projects. The API project, the EF Core project.

### API

First I created my model classes, which will get mapped data from the database. These model classes will have only the fields required
by the front end website. This abstraction also helps us remove any sensitive fields that we need to remove.

Each controller folder (can be viewed [here](https://github.com/hegde-atri/BankingApplication-be/tree/main/Bank.API/Controllers)) have their own repository interfaces that contain only the necassary methods. 
Each controller folder also has its required controller classes. With this we can add authentication, and required scopes for the api paths,
making sure that each user can only use api's withing their scope set in Azure B2C.


### EF Core

You can find the project under the Bank.Data folder. It contains the entities folder, from which EF core generates
database schemas and the Migrations folder which EF Core uses to make changes to the database schema. This allows for
"versioning" of our database, allowing us to rollback if a new change breaks the database/service or isn't what we
expected it to be. I have used EF Core in conjunction with Microsoft SQL Server.

I have written a trigger for new transaction entries on the database (in the SQL folder).
