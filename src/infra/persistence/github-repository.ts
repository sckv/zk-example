import { Axios } from 'axios';
import { injectable } from 'inversify';

@injectable()
export class GithubRepository {
  httpClient: Axios;

  constructor() {
    this.httpClient = new Axios({ baseURL: 'https://api.github.com/repos' });
  }

  async getRepositoryPathContent(
    username: string,
    repository: string,
    path: string = '',
  ): Promise<GithubRepositoryContent[]> {
    const response = await this.httpClient.get<GithubRepositoryContent[]>(
      `${username}/${repository}/contents/${path}`,
      { transformResponse: (data) => JSON.parse(data) },
    );

    return response.data;
  }

  async dumpRepositoryContents(
    username: string,
    repository: string,
  ): Promise<GithubRepositoryContent[]> {
    const rootContents = await this.getRepositoryPathContent(username, repository);

    const files = rootContents.filter((content) => content.type === 'file');
    const folders = rootContents
      .filter((content) => content.type === 'dir')
      .map((folder) => folder.path);

    while (folders.length) {
      const folderPath = folders.shift();
      const folderContents = await this.getRepositoryPathContent(username, repository, folderPath);
      const folderFiles = folderContents.filter((content) => content.type === 'file');
      const folderFolders = folderContents
        .filter((content) => content.type === 'dir')
        .map((folder) => folder.path);

      files.push(...folderFiles);
      folders.push(...folderFolders);
    }

    return files;
  }
}

export type GithubRepositoryContent = {
  name: string;
  path: string;
  sha: string;
  size: number;
  url: string;
  html_url: string;
  git_url: string;
  download_url: null | string;
  type: string;
  _links: Links;
};

export type Links = {
  self: string;
  git: string;
  html: string;
};
