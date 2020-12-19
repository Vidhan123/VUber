const GROUP_USER_TESTS = 'USER Routes Tests';
const GROUP_PRE_LOGIN_TESTS = 'Register and Login Routes Tests';
const GROUP_EDIT_PROFILE_TESTS = 'Edit Profile Routes Tests';
const GROUP_REQUEST_TESTS = 'Request Routes Tests';
const TEST_VALID_USER = 'Should Register valid User';
const TEST_DUPLICATE_USER = 'Should not register same email twice';
const TEST_INVALID_LOGIN = 'Should not allow Invalid log-ins';
const TEST_VALID_LOGIN = 'Should allow valid log-ins';
const TEST_UNAUTHENTICATED_REQ =
  'Should not allow unauthenticated requests to protected routes';
const TEST_PUBLIC_PROFILE = 'Should get public profile';
const TEST_FILE_UPLOAD = 'Should upload Image';
const TEST_CREATE_REQUEST = 'Should create request';
const TEST_EDIT_REQUEST = 'Should edit request';
const TEST_DELETE_REQUEST = 'Should delete request';
const TEST_ALL_REQUESTS = 'Should return all the available requests';
const TEST_ACCEPT_REQUEST = 'Should accept request';

module.exports = {
  GROUP_USER_TESTS,
  GROUP_PRE_LOGIN_TESTS,
  GROUP_EDIT_PROFILE_TESTS,
  GROUP_REQUEST_TESTS,
  TEST_VALID_USER,
  TEST_DUPLICATE_USER,
  TEST_INVALID_LOGIN,
  TEST_VALID_LOGIN,
  TEST_UNAUTHENTICATED_REQ,
  TEST_PUBLIC_PROFILE,
  TEST_FILE_UPLOAD,
  TEST_CREATE_REQUEST,
  TEST_EDIT_REQUEST,
  TEST_DELETE_REQUEST,
  TEST_ALL_REQUESTS,
  TEST_ACCEPT_REQUEST,
};
