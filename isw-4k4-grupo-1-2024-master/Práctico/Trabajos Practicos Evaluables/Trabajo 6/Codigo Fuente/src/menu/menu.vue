<template>
  <b-container fluid>
    <b-container fluid class="topAbs p-0">
      <b-navbar toggleable="lg" type="dark" variant="danger">
        <b-navbar-brand href="/">¡DeliverEat!</b-navbar-brand>

        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

        <b-collapse id="nav-collapse" is-nav>
          <!-- Right aligned nav items -->
          <b-navbar-nav class="ml-auto">
            <b-nav-item-dropdown right text="Notificaciones">
              <template #button-content style="color: white">
                Notificaciones
                <div style="font-size: 1.5em; display: inline">
                  <b-icon
                    icon="bell-fill"
                    class="rounded-circle bg-danger p-2"
                    variant="light"
                  ></b-icon>
                </div>
              </template>
              <b-dropdown-item href="#">No tiene notificaciones pendientes</b-dropdown-item>
            </b-nav-item-dropdown>

            <b-nav-item-dropdown right>
              <!-- Using 'button-content' slot -->
              <template #button-content>
                <em>{{ nombreUsuario }} </em>
                <div style="font-size: 1.5em; display: inline">
                  <b-icon
                    icon="person-circle"
                    class="rounded-circle bg-light p-2"
                    variant="dark"
                  ></b-icon>
                </div>
              </template>
              <b-dropdown-item href="#">Perfil</b-dropdown-item>
              <b-dropdown-item href="#">Cerrar Sesion</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-collapse>
      </b-navbar>
    </b-container>
    <b-container fluid style="margin-top: 5rem" >
        <slot />
      </b-container>
  </b-container>
</template>

<script>
export default {
  name:'MenuTemplate',
  data() {
    return {
      nombreUsuario: "Santiago",
      config: {
        errorLabel: "No se pudo recargar",
        startLabel: "Recargar",
        readyLabel: "Soltar para Recargar",
        loadingLabel: "Cargando",
      },
    };
  },
  methods: {
    onRefresh: function () {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve();
          location.reload();
        }, 1000);
      });
    },
  },
};
</script>

<style>
.topAbs {
  top: 0;
  right: 0;
  left: 0;
  position: fixed;
  z-index: 1000;
  display: block;
}
</style>