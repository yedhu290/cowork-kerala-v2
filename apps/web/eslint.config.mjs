import coreWebVitals from 'eslint-config-next/core-web-vitals';
import typescript from 'eslint-config-next/typescript';

// eslint-config-next 16 ships native flat configs. The previous setup wrapped
// them in FlatCompat, which is for consuming legacy .eslintrc configs - running
// it over an already-flat config produced "Converting circular structure to
// JSON" before a single file was linted, so nothing in this repo was ever
// actually checked. Importing the flat configs directly is all that is needed.
const eslintConfig = [
  ...coreWebVitals,
  ...typescript,
  {
    ignores: [
      '.next/**',
      'node_modules/**',
      'next-env.d.ts',
      'public/**',
    ],
  },
];

export default eslintConfig;
