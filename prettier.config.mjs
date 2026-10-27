import ali from 'prettier-config-ali';

export default {
  ...ali,
  proseWrap: 'never',
  plugins: ['prettier-plugin-packagejson'],
};
