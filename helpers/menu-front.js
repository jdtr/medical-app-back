const getMenuFront = ( role = 'USER_ROLE') => {
    const menu = [
        {
          title: 'Dashboard',
          icon: 'mdi mdi-gauge',
          submenu: [
            { title: 'Main', url: '/' },
            { title: 'ProgressBar', url: '/progress' },
            { title: 'Graphics', url: '/graphic-one' },
          ]
        },
        {
          title: 'Maintenance',
          icon: 'mdi mdi-folder-lock-open',
          submenu: [
            { title: 'Hospitals', url: '/hospitals' },
            { title: 'Doctors', url: '/doctors' }
          ]
        }
    ];

    if ( role == 'ADMIN_ROLE' ) {
        menu[1].submenu.unshift({ title: 'Users', url: '/users' })
    }
    return menu;
}

module.exports = {
    getMenuFront
}