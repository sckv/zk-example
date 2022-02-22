import { CalculateFilesExtensions } from '../../app/query/calculate-files-extensions';
import { container } from '../../container';
import { server } from './server';

server.get({
  route: '/:user/:repo',
  handler: async (flow) => {
    const response = await container
      .get(CalculateFilesExtensions)
      .execute(flow.params.user!, flow.params.repo!);

    flow.json(response);
  },
});

export { server as serverWithHandlers };
