import Datastore from 'nedb';
import path from 'path';

const configDb = new Datastore({
  filename: path.join(__dirname, 'config.db'),
  autoload: true,
});

export const saveConfig = (config: { timeliveUrl: string; quickbooksAuth: string }) =>
  new Promise((resolve, reject) => {
    configDb.update(
      { _id: 'sync-config' },
      { _id: 'sync-config', ...config },
      { upsert: true },
      (err: any) => (err ? reject(err) : resolve(true))
    );
  });

export const getConfig = () =>
  new Promise((resolve, reject) => {
    configDb.findOne({ _id: 'sync-config' }, (err: any, doc: any) => (err ? reject(err) : resolve(doc)));
  });

export default configDb;
