import { injectable } from 'inversify';

@injectable()
export class RepositoryContentsService {
  splitFileName(fullFileName: string) {
    const splitArray = fullFileName.split('.');

    return {
      extension: splitArray.pop() || 'NO_EXTENSION',
      fileName: splitArray.join('.'),
    };
  }

  splitAllFileNames(fullFileNames: string[]) {
    return fullFileNames.map(this.splitFileName);
  }

  countFileExtensions(filesList: string[]) {
    const splittedFileNames = this.splitAllFileNames(filesList);

    return splittedFileNames.reduce((acc, curr) => {
      if (!acc[curr.extension]) acc[curr.extension] = 1;
      else acc[curr.extension] += 1;
      return acc;
    }, {} as { [fileExtension: string]: number });
  }
}
