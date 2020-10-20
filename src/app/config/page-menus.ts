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
  'title': 'Statistic',
  'url': '/statistic'
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
  'title': 'Announcement',
  'url': '/announcement'
},{
  'icon': 'fas fa-tasks',
  'title': 'Survey',
  'url': '/survey'
},{
  'icon': 'fas fa-futbol',
  'title': 'Sport',
  'url': '/sport'
},{
  'icon': 'fab fa-dribbble',
  'title': 'League',
  'url': '/league'
},{
  'icon': 'far fa-smile',
  'title': 'Event',
  'url': '/event'
},{
  'icon': 'fas fa-newspaper',
  'title': 'News',
  'url': '/news'
},{
  'icon': 'fas fa-code',
  'title': 'Admin Log List',
  'url': '/adminlog'
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
}];

export default pageMenus;
