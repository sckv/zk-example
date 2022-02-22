import { RepositoryContentsService } from '../repository-files-service';

describe('Repository Files Service', () => {
  const instance = new RepositoryContentsService();

  test('split simple filename', () => {
    const fullFileName = 'file-name.ts';

    const splitData = instance.splitFileName(fullFileName);

    expect(splitData.extension).toBe('ts');
    expect(splitData.fileName).toBe('file-name');
  });

  test('split complex filename', () => {
    const fullFileName = 'file.name.ts';

    const splitData = instance.splitFileName(fullFileName);

    expect(splitData.extension).toBe('ts');
    expect(splitData.fileName).toBe('file.name');
  });

  test('split multiple filenames', () => {
    const fullFileNames = ['file.name.ts', 'file-name.js'];

    const splitData = instance.splitAllFileNames(fullFileNames);

    expect(splitData[0].extension).toBe('ts');
    expect(splitData[0].fileName).toBe('file.name');
    expect(splitData[1].extension).toBe('js');
    expect(splitData[1].fileName).toBe('file-name');
  });

  test('count filenames', () => {
    const fullFileNames = ['file.name.ts', 'file-name.js', 'another-file.ts'];

    const extensionsCount = instance.countFileExtensions(fullFileNames);

    expect(extensionsCount.ts).toBe(2);
    expect(extensionsCount.js).toBe(1);
  });
});
