import { inject, injectable } from 'inversify';
import { RepositoryContentsService } from '../../domain/repository-files-service';
import { GithubRepository } from '../../infra/persistence/github-repository';

@injectable()
export class CalculateFilesExtensions {
  constructor(
    @inject(GithubRepository)
    public githubRepository: GithubRepository,
    @inject(RepositoryContentsService)
    public repositoryFilesService: RepositoryContentsService,
  ) {}

  async execute(username: string, repository: string) {
    const repositoryContents = await this.githubRepository.dumpRepositoryContents(
      username,
      repository,
    );

    const fileNames = repositoryContents.map(({ name }) => name);

    const extensionsCount = await this.repositoryFilesService.countFileExtensions(fileNames);

    return extensionsCount;
  }
}
