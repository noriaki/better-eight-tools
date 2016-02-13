'use strict'

import fs from 'fs'
import path from 'path'
import Haml from 'haml'

const root = () => path.resolve('', 'src/views')

module.exports = {
  root: root(),
  render_partial: (filename, locals={}) => {
    const extname = '.haml'
    const basename = path.basename(filename, extname)
    const target = [
      path.dirname(filename), '/',
      (basename[0] === '_' ? basename : '_' + basename), extname
    ].join('')
    
    return Haml.render(
      fs.readFileSync(path.join(root(), target), 'utf8'), {
	pretty: true, locals: locals })
  }
}
