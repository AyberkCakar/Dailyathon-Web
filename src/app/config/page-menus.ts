var pageMenus = [{
  'icon': 'fab fa-windows',
  'title': 'Dashboard',
  'url': '/dashboard'
},{
  'icon': 'fas fa-user-secret',
  'title': 'Admin',
  'url': '/admin'
},{
  'icon': 'fas fa-users',
  'title': 'User',
  'url': '/user'
},{
  'icon': 'far fa-chart-bar',
  'title': 'İstatistik',
  'url': '/istatistik'
},{
  'icon': 'fas fa-th-list',
  'title': 'Category',
  'url': '/category'
},{
  'icon': 'fas fa-hashtag',
  'title': 'Tag',
  'url': '/tag'
},{
  'icon': 'fas fa-bullhorn',
  'title': 'Duyuru',
  'url': '/duyuru'
},{
  'icon': 'fas fa-tasks',
  'title': 'Anket',
  'url': '/anket'
},{
  'icon': 'fas fa-futbol',
  'title': 'Spor',
  'url': '/spor'
},{
  'icon': 'far fa-smile',
  'title': 'Etkinlik',
  'url': '/etkinlik'
},{
  'icon': 'fas fa-newspaper',
  'title': 'Haber',
  'url': '/haber'
},{
  'icon': 'far fa-file-code',
  'title': 'Log',
  'caret': 'true',
  'submenu': [{
    'url': '/servelog',
    'title': 'Serve Log List',
  },{
    'url': '/databotlog',
    'title': 'Databot Log List'
  }]
},{
  'icon': 'fas fa-code',
  'title': 'Admin Log List',
  'url': '/home'
}];

export default pageMenus;
