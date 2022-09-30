filter('messages.items.create', (item, meta, context) => {
    console.log('CREATING ITEM: ', {
        item,
        meta,
        context
    });

    return item;
});


filter('messages.items.update', (item, meta, context) => {
    console.log('UPDATING ITEM: ', {
        item,
        meta,
        context
    });
});

// _____________________________________


filter('messages.items.create', (input, { collection }) => {
    console.log('CREANDO...', {
        input,
        collection
    });

    return input;
});

filter('messages.items.update', (input, { collection }) => {
    console.log('ACTUALIZANDO...', {
        input,
        collection
    });
});


// _______________________________________


action('messages.items.create', async ({ keys }, { item, schema, accountability }) => {
    console.log('CREANDO...', {
        services, 
        input,
        collection
    });
    
    const messageItemService =  new ItemsService(
        'message',
        {
            schema: schema,
            accountability: accountability
        }
    )
    console.log(services, messageItemService)

    try {
        const result = await messageItemService.readByQuery(keys, {
            filter: {id: parseInt (item)},
            fields: ["URL", "URL_short", "text"],
        });
        
    } catch (error) {
        
    }

    return input;
});

//_______________________________________

module.exports = async function registerHook({ action, filter }, { services, getSchema }) {
    const { resData } = require('./utility.js');
    const { ItemsService } = services;
  
    let currentKeys = [];
    const recordService = new ItemsService('records', { schema: await getSchema() });
    const currentService = new ItemsService('currents', { schema: await getSchema() });
  
    const updateFields = async uid => {
      const aggregate = await recordService.readByQuery({
        fields: ['type'],
        group: ['type'],
        aggregate: { sum: ['price'] },
        filter: { current: { _eq: uid } },
      });
      return await currentService.updateOne(uid, resData(aggregate));
    };
  
    const findCurrents = async uid => {
      const records = await recordService.readMany(uid, { fields: ['price', 'type', 'current'] });
      return await records.reduce((acc, x) => [...acc, x.current], []);
    };
  
    const syncData = async (input, e) => {
      const keys = e === 'create' ? (currentKeys = [input.payload.current]) : e === 'update' ? input.keys : input;
      if (e === 'delete' || e === 'filter.delete' || input.payload.price || input.payload.type || input.payload.current) {
        if (e === 'update' || e === 'filter.delete') currentKeys = await findCurrents(keys);
        if (e !== 'filter.delete') currentKeys.map(async currentKey => await updateFields(currentKey));
      }
    };
  
    action('records.items.create', async input => syncData(input, 'create'));
    action('records.items.update', async input => syncData(input, 'update'));
    action('records.items.delete', async input => syncData(input, 'delete'));
    filter('records.items.delete', async input => syncData(input, 'filter.delete'));
  };

  //_____________________________

  let hookContext;

async function copyItemFromOneToTwo(input, context) {
  if (input.payload.somefile) {
    const { services } = hookContext;
    const { schema } = context;
    const collection1Service = new services.ItemsService('collection1', { schema });
    const collection2Service = new services.ItemsService('collection2', { schema });

    const itemToCopy = await collection1Service.readOne(input.keys[0], {
      fields: ['field1', 'field2', 'somefile'],
    });

    await collection2Service.createOne({
      field1: itemToCopy.field1,
      field2: itemToCopy.field2,
      somefile: itemToCopy.somefile,
    });
  }
  return input;
}

module.exports = function registerHook({ action }, incomingHookContext) {
  hookContext = incomingHookContext;

  action('collection1.items.update', copyItemFromOneToTwo);
};
