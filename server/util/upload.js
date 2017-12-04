const initConfig = require('../config/init-config.js');
const qiniu      = require("qiniu");

const mac = new qiniu.auth.digest.Mac(initConfig.ACCESSKEY, initConfig.SECRETKEY);
const options = {
  scope: initConfig.BUCKET,
  expires: 7200
};
let putPolicy    = new qiniu.rs.PutPolicy(options),
    uploadToken  = putPolicy.uploadToken(mac),
    config       = new qiniu.conf.Config(),
    formUploader = new qiniu.form_up.FormUploader(config),
    putExtra     = new qiniu.form_up.PutExtra();

function uploadFile (key, localFile) {
  return new Promise (function (resolve, reject) {
    formUploader.putFile(uploadToken, key, localFile, putExtra, function(respErr,
      respBody, respInfo) {
      if (respErr) {
        reject(respErr);
      }
      if (respInfo.statusCode == 200) {
        resolve({isError: false, src: initConfig.QINIU_PATH + respBody.key});
      } else {
        console.log(respInfo.statusCode);
        console.log(respBody);
      }
    });
  })
  .catch(err => console.log(err))
}

module.exports = uploadFile;
