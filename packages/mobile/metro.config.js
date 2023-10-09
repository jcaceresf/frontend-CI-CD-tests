const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');
const path = require('path');

function extraNodeModules() {
  // Mapea los enlaces simbólicos a sus rutas físicas
  return {
    shared: path.resolve(__dirname, 'node_modules/shared'),
    // Agrega otras dependencias aquí si es necesario
  };
}

const config = {
  watchFolders: [
    path.resolve(__dirname, '../../node_modules'),
    path.resolve(__dirname, '../../node_modules/shared'),
  ],
  resolver: {
    extraNodeModules: extraNodeModules(),
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
