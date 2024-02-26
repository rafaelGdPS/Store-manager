const statusCode = { 
  SUCCESSFUL: 200,
  CREATED: 201,
  NOT_FOUND: 404,
};

const trnaslateStatus = (statusText) => statusCode[statusText];

module.exports = trnaslateStatus;