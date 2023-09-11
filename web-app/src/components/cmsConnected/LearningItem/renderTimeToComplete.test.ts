import { renderTimeToComplete } from './renderTimeToComplete';

it('transforms minutes into user-readable representation of time', () => {
  expect(renderTimeToComplete(0)).toEqual('');
  expect(renderTimeToComplete(1)).toEqual('1 minute');
  expect(renderTimeToComplete(12)).toEqual('12 minutes');
  expect(renderTimeToComplete(60)).toEqual('1 hour');
  expect(renderTimeToComplete(120)).toEqual('2 hours');
  expect(renderTimeToComplete(121)).toEqual('2 hours, 1 minute');
  expect(renderTimeToComplete(123)).toEqual('2 hours, 3 minutes');
});
