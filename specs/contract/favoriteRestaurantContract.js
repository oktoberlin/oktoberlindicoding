/* eslint-disable no-undef */
const itActsAsFavoriteRestaurantModel = (favoriteRestaurant) => {
    it('should return the restaurant that has been added', async () => {
      favoriteRestaurant.putRestaurant({ id: 'rqdv5juczeskfw1e8675' });
      favoriteRestaurant.putRestaurant({ id: 's1knt6za9kkfw1e8675' });

      expect(await favoriteRestaurant.getRestaurant('rqdv5juczeskfw1e8675'))
        .toEqual({ id: 'rqdv5juczeskfw1e8675' });
      expect(await favoriteRestaurant.getRestaurant('s1knt6za9kkfw1e8675'))
        .toEqual({ id: 's1knt6za9kkfw1e8675' });
      expect(await favoriteRestaurant.getRestaurant('asdasdasdasdads'))
        .toEqual(undefined);
    });

    it('should refuse a restaurant from being added if it does not have the correct property', async () => {
      favoriteRestaurant.putRestaurant({ aProperty: 'property' });

      expect(await favoriteRestaurant.getAllRestaurants()).toEqual([]);
    });

    it('can return all of the restaurants that have been added', async () => {
      favoriteRestaurant.putRestaurant({ id: 'rqdv5juczeskfw1e8675' });
      favoriteRestaurant.putRestaurant({ id: 's1knt6za9kkfw1e8675' });

      expect(await favoriteRestaurant.getAllRestaurants())
        .toEqual([
          { id: 'rqdv5juczeskfw1e8675' },
          { id: 's1knt6za9kkfw1e8675' },
        ]);
    });

    it('should remove favorite restaurant', async () => {
      favoriteRestaurant.putRestaurant({ id: 'rqdv5juczeskfw1e8675' });
      favoriteRestaurant.putRestaurant({ id: 's1knt6za9kkfw1e8675' });
      favoriteRestaurant.putRestaurant({ id: 'w9pga3s2tubkfw1e8675' });

      await favoriteRestaurant.deleteRestaurant('rqdv5juczeskfw1e8675');

      expect(await favoriteRestaurant.getAllRestaurants())
        .toEqual([
          { id: 's1knt6za9kkfw1e8675' },
          { id: 'w9pga3s2tubkfw1e8675' },
        ]);
    });

    it('should handle request to remove a restaurant even though the restaurant has not been added', async () => {
      favoriteRestaurant.putRestaurant({ id: 'rqdv5juczeskfw1e8675' });
      favoriteRestaurant.putRestaurant({ id: 's1knt6za9kkfw1e8675' });
      favoriteRestaurant.putRestaurant({ id: 'w9pga3s2tubkfw1e8675' });

      await favoriteRestaurant.deleteRestaurant('uewq1zg2zlskfw1e8675');

      expect(await favoriteRestaurant.getAllRestaurants())
        .toEqual([
          { id: 'rqdv5juczeskfw1e8675' },
          { id: 's1knt6za9kkfw1e8675' },
          { id: 'w9pga3s2tubkfw1e8675' },
        ]);
    });

    it('should be able to search for restaurants', async () => {
      favoriteRestaurant.putRestaurant({ id: 'rqdv5juczeskfw1e8675', name: 'restaurant a' });
      favoriteRestaurant.putRestaurant({ id: 'rqdv5juczeskfw1e8676', name: 'restaurant b' });
      favoriteRestaurant.putRestaurant({ id: 'rqdv5juczeskfw1e8677', name: 'restaurant abc' });
      favoriteRestaurant.putRestaurant({ id: 'rqdv5juczeskfw1e8678', name: 'restaurant adefg' });

      expect(await favoriteRestaurant.searchRestaurants('restaurant a')).toEqual([
        { id: 'rqdv5juczeskfw1e8675', name: 'restaurant a' },
        { id: 'rqdv5juczeskfw1e8677', name: 'restaurant abc' },
        { id: 'rqdv5juczeskfw1e8678', name: 'restaurant adefg' },
      ]);
    });
  };

export { itActsAsFavoriteRestaurantModel };