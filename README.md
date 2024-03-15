# React Laravel APP
Create a simple react + laravel application where a user has to enter his info (phone number, password, name, shipping address), add multiple products to the basket and then create the order. UI doesn’t really matter much, so you can use any UI library that you feel comfortable with. Code readability is very important!


**Frontend requirements:**

1. Use latest react version (inertia can not be used)
2. Application consist of 2 pages:
- Homepage: authentication (e.g. via modal on page load), products list, basket
- Order details page (order id is a route parameter): Customer info, Order info (items, creation time, total)
1. Use redux for Basket. Basket is not being wiped on browser tab close (Items that were added are still there). Basket is automatically cleared when order is created.
2. Ability to change items quantity, add notes to order items in the basket.

**Backend requirements:**

1. Use PHP 8.2,  Laravel 10 + Sail (Postgres as database)
2. Use sanctum authentication
3. Use backend as API (inertia can not be used)
4. Products seeder which creates 20 random products (price is random, but between 3 and 5 euros)
5. All the necessary order info is stored in database (including order total)
6. Upon order creation, validate that minimum order amount has to be at least 15 eur.
7. Order is created with status “pending” initially
8. Create a ProcessOrder job that dispatches an email to the admin (address stored in config) and changes the order status to processed. Email content does not matter, can be just a plain text. Dispatch the job with 3 min delay after order creation.

Extra (nice to have):

1. Add some backend tests for orders api (PEST is preferred).

<p align="center">
    <img src="https://user-images.githubusercontent.com/35098175/145682384-0f531ede-96e0-44c3-a35e-32494bd9af42.png" alt="docker-laravel">
</p>
A simple job board where users can post their jobs and send a response to other jobs.
### How install

Set up env file then run commands:
```bash
$ sudo make docker-up
$ sudo make install
$ make perm
$ make assets
$ sudo make passport
$ sudo make listen
```
