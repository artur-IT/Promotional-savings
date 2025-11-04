import { NativeModules } from 'react-native';

// Get version directly from Android BuildConfig - no scripts needed!
export const getVersion = async (): Promise<string> => {
    const { VersionModule } = NativeModules;
    return await VersionModule.getVersion();
};

// Helper function to get version string for display
export const getVersionString = async (): Promise<string> => {
  const version = await getVersion();
  return `v. ${version}`;
};
