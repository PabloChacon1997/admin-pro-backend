const getMenuFront = (role = "USER_ROLE") => {
  const menu = [
    {
      titulo: "Dashboard",
      icon: "mdi mdi-gauge",
      submenu: [
        { titulo: "Main", path: "" },
        { titulo: "ProgressBar", path: "progress" },
        { titulo: "Grafica", path: "grafica1" },
        { titulo: "Promesas", path: "promesas" },
        { titulo: "RXJS", path: "rxjs" },
      ],
    },
    {
      titulo: "Mantenimiento",
      icon: "mdi mdi-folder-lock-open",
      submenu: [
        // { titulo: 'Usuarios', path: 'usuarios' },
        { titulo: "Hospitales", path: "hospitales" },
        { titulo: "Medicos", path: "medicos" },
      ],
    },
  ];
  if (role === "ADMIN_ROLE") {
    menu[1].submenu.unshift({ titulo: "Usuarios", path: "usuarios" });
  }

  return menu;
};

module.exports = {
  getMenuFront,
};
