import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.japanesehelper',
  appName: 'JapaneseHelper',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;