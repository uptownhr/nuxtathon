import Vue from 'vue'
import filestack from 'filestack-js';

export default (ctx, inject) => {
  const client = filestack.init(process.env.filestack);

  ctx.$filepicker = client
  inject('filepicker', client)
}