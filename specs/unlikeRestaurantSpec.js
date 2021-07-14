/* eslint-disable no-undef */
// import LikeButtonPresenter from '../src/scripts/utils/like-button-presenter';
import FavoriteRestaurantIdb from '../src/scripts/data/favoriteRestaurant-idb';
import * as TestFactories from './helpers/testFactories';

const addLikeButtonContainer = () => {
    document.body.innerHTML = '<div id="likeButtonContainer"></div>';
};

describe('Unliking A Restaurant', () => {
    beforeEach(async () => {
        addLikeButtonContainer();
        await FavoriteRestaurantIdb.putRestaurant({ id: 'rqdv5juczeskfw1e867' });
    });

    afterEach(async () => {
        await FavoriteRestaurantIdb.deleteRestaurant('rqdv5juczeskfw1e867');
    });

    it('should show the unlike button when the restaurant has been liked before', async () => {
        await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 'rqdv5juczeskfw1e867' });
        expect(document.querySelector('[aria-label="unlike this restaurant"]'))
        .toBeTruthy();
    });
    it('should not show the like button when the restaurant has been liked before', async () => {
        await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 'rqdv5juczeskfw1e867' });

        expect(document.querySelector('[aria-label="like this restaurant"]'))
        .toBeFalsy();
    });
    it('should be able to remove liked restaurant from the list', async () => {
        await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 'rqdv5juczeskfw1e867' });

        document.querySelector('[aria-label="unlike this restaurant"]').dispatchEvent(new Event('click'));

        expect(await FavoriteRestaurantIdb.getAllRestaurants()).toEqual([]);
    });

    it('should not throw error if the unliked restaurant is not in the list', async () => {
        await TestFactories.createLikeButtonPresenterWithRestaurant({ id: 'rqdv5juczeskfw1e867' });

        // hapus dulu restaurant dari daftar restaurant yang disukai
        await FavoriteRestaurantIdb.deleteRestaurant('rqdv5juczeskfw1e867');

        // kemudian, simulasikan pengguna menekan widget batal menyukai restaurant
        document.querySelector('[aria-label="unlike this restaurant"]').dispatchEvent(new Event('click'));

        expect(await FavoriteRestaurantIdb.getAllRestaurants()).toEqual([]);
    });
});