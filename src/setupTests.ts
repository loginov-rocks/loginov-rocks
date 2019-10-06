/* eslint-disable import/no-extraneous-dependencies */

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { GlobalWithFetchMock } from 'jest-fetch-mock';

// Configure Enzyme.
configure({ adapter: new Adapter() });

// Configure Fetch.
const customGlobal: GlobalWithFetchMock = global as GlobalWithFetchMock;
customGlobal.fetch = require('jest-fetch-mock');

customGlobal.fetchMock = customGlobal.fetch;
