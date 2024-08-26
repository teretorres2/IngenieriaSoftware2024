<template>
  <b-container fluid="md">
    <b-card 
      no-body 
      class="b-card imgCard"
    >
      <b-card-body class="p-0">
        <b-carousel
          id="carousel-1"
          :interval="4000"
          img-width="1024"
          img-height="200"
          background="#ababab"
          style="text-shadow: 1px 1px 2px #333"
        >
          <!-- Text slides with image -->
          <b-carousel-slide
            caption="Deliver Eat"
            text="Pedi lo que sea!"
            img-src="https://picsum.photos/1024/480/?image=52"
          ></b-carousel-slide>
        </b-carousel>
      </b-card-body>
    </b-card>
    <b-card 
      no-body 
      class="mt-4 b-card"
      style="max-width: 1024px;"
    >
      <b-card-body>
        <div class="row t-aling-center">
          <div class="col-sm-6 mb-3">
            <router-link 
              to="/" 
              class="btn rl-circle"
            >
              <div class="row img-center h4">
                <b-icon 
                  icon="shop" 
                  aria-hidden="true"
                >
                </b-icon>
              </div>
              <div class="row">Explorar Tiendas adheridas</div>
            </router-link>
          </div>
          <div class="col-sm-6">
            <router-link 
              to="/LoQueSea" 
              class="btn rl-circle"
            >
              <div class="row img-center h4">
                <b-icon 
                  icon="bag" 
                  aria-hidden="true"
                > 
                </b-icon>
              </div>
              <div 
                class="row" 
                style="justify-content: space-around"
              >
                Pedir lo que sea!
              </div>
            </router-link>
          </div>
        </div>
      </b-card-body>
    </b-card>
  </b-container>
</template>

<script>
export default {
  name:'PaginaPrincipal',
  data() {
    return {
      sliding: null,
    };
  },
  methods: {
    onSlideStart() {
      this.sliding = true;
    },
    onSlideEnd() {
      this.sliding = false;
    },
  },
};
</script>

<style scoped>


.rl-circle {
  width: 100px !important;
  height: 100px !important;
  padding: 10px 10px !important;
  line-height: 1.33 !important;
  border-radius: 50% !important;
  background-color: #ffffff !important;
  text-align: center !important;
  font-size: 10px !important;
  border-width: 2px !important;
  border-color: #00abe2 !important;
  display: inline-block !important;
}

.t-aling-center {
  text-align: center;
}
.img-center {
  align-items: center !important;
  justify-content: center !important;
}
</style>