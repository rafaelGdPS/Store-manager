const statusCode = { 
  CREATED: 201,
  DELETED: 204,
  NOT_FOUND: 404,
  SUCCESSFUL: 200,
};

const trnaslateStatus = (statusText) => statusCode[statusText];

module.exports = trnaslateStatus;