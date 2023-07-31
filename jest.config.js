module.exports = {
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/src/__mock__/fileMock.js',
    '\\.(css|less)$': '<rootDir>/src/__mock__/styleMock.js',
  },
};