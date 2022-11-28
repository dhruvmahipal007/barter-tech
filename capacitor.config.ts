import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  plugins: {
    GoogleAuth: {
      scopes: ['profile', 'email'],
      serverClientId:
        '737194284758-c9eutvgthupd9qhjoqa350vhj95n3aka.apps.googleusercontent.com',
      forceCodeForRefreshToken: true,
    },
  },
  appId: 'io.ionic.starter',
  appName: 'Barter',
  webDir: 'www',
  bundledWebRuntime: false,
};

export default config;
