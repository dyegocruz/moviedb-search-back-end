// import mongoose from 'mongoose';
// import config from './index';

// mongoose.Promise = global.Promise;

// export default mongoose.connect(config.mongoUrl);

import mongoose from 'mongoose';
import config from './index';

export default (callback) => {
  const db = mongoose.connect(config.mongoUrl);
  callback(db);
};

mongoose.Error.messages.general.required = "O atributo '{PATH}' é obrigatório.";
