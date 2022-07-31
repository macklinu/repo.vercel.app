import { parseRepoUrl } from './parseRepoUrl'

test.each([
  [undefined, undefined],
  ['', undefined],
  ['not a url', undefined],
  [
    'https://github.com/babel/babel/tree/master/packages/babel-cli',
    'https://github.com/babel/babel/tree/master/packages/babel-cli',
  ],
  [
    'git+https://github.com/vercel/ncc.git',
    'https://github.com/vercel/ncc.git',
  ],
])('parseRepoUrl(%p) => %p', (input, expected) => {
  expect(parseRepoUrl(input)).toEqual(expected)
})
