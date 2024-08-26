<template>
  <b-container>
    <div  id="formulario">
      <form>
        <div class="form-row">
          <div class="col-sm-6 col-sm-12">
            <div class="form-group">
              <label for="inp-SelFotografia" class="form-label">
                Seleccionar de la biblioteca
              </label>
              <b-form-file 
                id="inp-SelFotografia"
                v-model="foto" 
                class="mt-3"
                accept=".jpg"
                plain
              >
              </b-form-file>
              <br/>
              <label 
                for="inp-SelFotografia" 
                style="color:red" 
                v-if="foto && (foto.size > 5 *1024 * 1024 )"
                >
                  Tamaño máximo permitido de 5Mb
                </label>
            </div>
          </div>
        </div>
      </form>
      <button 
        :disabled="!!isValidFile()" 
        class="btn btn-primary justify-content-end" 
        @click="confirm"
      >
        Confirmar
      </button>
    </div>
  </b-container>
</template>


<script>
export default {
  name: "AgregarFotografia",
  data() {
    return {
      foto: null,
    };
  },
  methods: {
    confirm: function(){
      this.$emit("fileLoaded", this.foto);
    },
    isValidFile() {
      return (this.foto && (this.foto.size > 5 *1024 * 1024 ));
    },
  },  
  computed: {
  }
}
</script>

<style scoped>

</style>

