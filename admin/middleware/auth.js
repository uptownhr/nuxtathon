import debug from 'debug'
import axios from 'axios'

export default function({store, redirect, route, req}) {
  return new Promise( resolve => {
    debug('bambee:nuxt')('auth middleware')

    if (route.path == '/login') return resolve()
    if (!store.state.current_user) return redirect('/login')

    if (!hasAdminAccess(store.state.current_user)) return redirect('/login')

    if (!hasPageAccess(store.state.current_user,route.path)) return redirect('/')

    resolve()
  })
}

function hasAdminAccess(user) {
  let roles = ['admin', 'hr-admin']

  return roles.indexOf(user.role) != -1
}

function hasPageAccess(user, page) {
  let role = user.role

  if (role == 'admin') return true
  if (page == '/') return true

  let access = {
    'hr-admin': ['customers','tickets']
  }


  let user_access = access[role]

  let name = page.split('/')[1]


  let has_access = user_access.indexOf(name) != -1

  return has_access
}