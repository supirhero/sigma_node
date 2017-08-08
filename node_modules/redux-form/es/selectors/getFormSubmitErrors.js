var createGetFormSubmitErrors = function createGetFormSubmitErrors(_ref) {
  var getIn = _ref.getIn;
  return function (form, getFormState) {
    return function (state) {
      var nonNullGetFormState = getFormState || function (state) {
        return getIn(state, 'form');
      };
      return getIn(nonNullGetFormState(state), form + '.submitErrors');
    };
  };
};

export default createGetFormSubmitErrors;