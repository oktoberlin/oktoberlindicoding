const assert = require('assert');

Feature('Liking Restaurants');

Before(({ I }) => {
  I.amOnPage('/#/favorit');
});

Scenario('showing empty liked restaurants', ({ I }) => {
  I.seeElement('#query');

  I.see('Tidak ada restoran untuk ditampilkan', '.restaurant-item__not__found');
});

Scenario('liking one restaurant', async ({ I }) => {
  I.see('Tidak ada restoran untuk ditampilkan', '.restaurant-item__not__found');

  I.amOnPage('/');

  I.seeElement('.post-item__title a');

  const firstRestaurant = locate('.post-item__title a').first();
  const firstRestaurantTitle = await I.grabTextFrom(firstRestaurant);
  I.click(firstRestaurant);

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/favorit');
  I.seeElement('.post-item');
  const likedRestaurantTitle = await I.grabTextFrom('.post-item__title');

  assert.strictEqual(firstRestaurantTitle, likedRestaurantTitle);
});

Scenario('unliking one restaurant', async ({ I }) => {
    I.see('Tidak ada restoran untuk ditampilkan', '.restaurant-item__not__found');

    I.amOnPage('/');
    I.seeElement('.post-item__title a');
    I.click(locate('.post-item__title a').first());
    I.seeElement('#likeButton');
    I.click('#likeButton');

    I.amOnPage('/#/favorit');
    I.seeElement('.detail-link');
    I.click(locate('.detail-link').first());
    I.seeElement('#likeButton');
    I.click('#likeButton');

    I.amOnPage('/#/favorit');
    I.seeElement('.restaurant-item__not__found');
    const unlikeCondition = 'Tidak ada restoran untuk ditampilkan';
    const noFavoriteRestaurant = await I.grabTextFrom('.restaurant-item__not__found');

    assert.strictEqual(noFavoriteRestaurant, unlikeCondition);
});

Scenario('searching restaurants', async ({ I }) => {
  I.see('Tidak ada restoran untuk ditampilkan', '.restaurant-item__not__found');

  I.amOnPage('/');

  I.seeElement('.post-item__title a');

  const titles = [];

  for (let i = 1; i <= 3; i++) {
    I.click(locate('.post-item__title a').at(i));
    I.seeElement('#likeButton');
    I.click('#likeButton');
    titles.push(await I.grabTextFrom('.post-item__title'));
    I.amOnPage('/');
  }

  I.amOnPage('/#/favorit');
  I.seeElement('#query');

  const searchQuery = titles[1].substring(1, 3);
  const matchingRestaurants = titles.filter((title) => title.indexOf(searchQuery) !== -1);

  I.fillField('#query', searchQuery);
  I.pressKey('Enter');

  const visibleLikedRestaurants = await I.grabNumberOfVisibleElements('.post-item');
  assert.strictEqual(matchingRestaurants.length, visibleLikedRestaurants);

  matchingRestaurants.forEach(async (title, index) => {
    const visibleTitle = await I.grabTextFrom(locate('.post-item__title').at(index + 1));
    assert.strictEqual(title, visibleTitle);
  });
});

Scenario('posting consumer review', async ({ I }) => {
  I.see('Tidak ada restoran untuk ditampilkan', '.restaurant-item__not__found');

  I.amOnPage('/');
  I.seeElement('.post-item__title a');
  I.click(locate('.post-item__title a').first());

  I.fillField('#name', 'okto');
  I.fillField('#review', 'restoran nya rapih dan recommended');
  I.seeElement('#submit');
  I.click('#submit');
  I.see('Terima kasih atas Reviewnya. Review anda telah tersimpan. Anda bisa melihat review anda di kolom Consumer Review dengan merefresh halaman ini setelah beberapa saat.');
});
