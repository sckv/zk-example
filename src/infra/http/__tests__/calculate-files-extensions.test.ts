import nock from 'nock';
import { serverWithHandlers } from '../controllers';
import axios from 'axios';

beforeAll(async () => {
  await serverWithHandlers.start();
});

afterAll(async () => {
  await serverWithHandlers.stop();
});
describe('Integration test - calculate files extensions', () => {
  test('count repository files extensions', async () => {
    nock('https://api.github.com')
      .get('/repos/user/repo/contents/')
      .reply(200, [
        {
          name: 'file-name.ts',
          path: 'file-name.ts',
          sha: 'sha',
          size: 1,
          url: 'url',
          html_url: 'html_url',
          git_url: 'git_url',
          download_url: null,
          type: 'file',
        },
        {
          name: 'fol',
          path: 'fol',
          sha: 'sha',
          size: 1,
          url: 'url',
          html_url: 'html_url',
          git_url: 'git_url',
          download_url: null,
          type: 'dir',
        },
      ]);

    nock('https://api.github.com')
      .get('/repos/user/repo/contents/fol')
      .reply(200, [
        {
          name: 'fol-file-name.ts',
          path: 'fol/file-name.ts',
          sha: 'sha',
          size: 1,
          url: 'url',
          html_url: 'html_url',
          git_url: 'git_url',
          download_url: null,
          type: 'file',
        },
        {
          name: 'fol-file-name2.js',
          path: 'fol/fol-file-name2.js',
          sha: 'sha',
          size: 1,
          url: 'url',
          html_url: 'html_url',
          git_url: 'git_url',
          download_url: null,
          type: 'file',
        },
      ]);

    const extensionsCount = await (await axios.get('http://0.0.0.0:3000/user/repo')).data;

    expect(extensionsCount.ts).toBe(2);
    expect(extensionsCount.js).toBe(1);
  });
});
