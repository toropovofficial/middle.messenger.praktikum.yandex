import { ProfileAPI, ProfileData } from '../api/ProfileApi';
import { store } from '../utils/Store';
import { IUser } from '../utils/interfaces';

class ProfileController {
  private api: any;

  constructor() {
    this.api = new ProfileAPI();
  }

  async update(data: ProfileData) {
    this.api
      .updateProfile(data)
      .then(async (x: IUser) => {
        await this.fetchUser(x.id);
        $router.go('/profile');
      })
      .catch(() => {});
  }

  async changePassword(data: any) {
    this.api
      .changePassword(data)
      .then(() => {
        $router.go('/profile');
      })
      .catch(() => {});
  }

  async updateAvatar(data: any) {
    this.api
      .updateAvatar(data)
      .then(async (x: IUser) => {
        store.set('user.data', x);
      })
      .catch((err: any) => {
        console.error(err);
      });
  }

  async fetchUser(id: number) {
    store.set('user.isLoading', true);
    await this.api
      .getUser(id)
      .then((user: IUser) => {
        store.set('user.data', user);
      })
      .finally(() => {
        setTimeout(() => {
          return store.set('user.isLoading', false);
        }, 1000);
      });
  }
}

export default new ProfileController();
