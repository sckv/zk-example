import { GithubRepository } from '../github-repository';
import nock from 'nock';

describe('Github Repository', () => {
  const instance = new GithubRepository();

  test('get one repository level', async () => {
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
      ]);

    const repositoryLevelContents = await instance.getRepositoryPathContent('user', 'repo');

    expect(repositoryLevelContents[0]).toEqual({
      name: 'file-name.ts',
      path: 'file-name.ts',
      sha: 'sha',
      size: 1,
      url: 'url',
      html_url: 'html_url',
      git_url: 'git_url',
      download_url: null,
      type: 'file',
    });
  });

  test('dump repository contents', async () => {
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

    const repositoryLevelContents = await instance.dumpRepositoryContents('user', 'repo');

    expect(repositoryLevelContents).toEqual([
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
  });
});
