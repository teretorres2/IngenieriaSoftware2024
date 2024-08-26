<template>
  <b-container>
    <b-modal
      id="modal-mapas"
      title="Seleccionar un punto en el mapa"
      size="xl"
      hide-footer
    >
      <MapaUbicacion
        @locationready="OnLocationSelected"
        :ubicacionParam="pedido.ubicacionNegocio"
      />
    </b-modal>
    <b-modal
      id="modal-foto"
      title="Agregar una Foto del pedido"
      hide-footer
    >
      <AgregarFotografia 
        @fileLoaded="OnsuccessCargarFoto" 
        :b64Img="pedido.ImagenPath"
      />
    </b-modal>
    <b-modal id="modal-confirmacion" title="Ya casi termina" hide-footer>
      <template>
        <p>¿Desea confirmar el pedido?</p>
      </template>

      <button 
        class="btn btn-primary justify-content-end" 
        @click="pedidoConfirmado"
      >
        Confirmar
      </button>
    </b-modal>
    <b-modal id="modal-confirmado" title="Ya esta listo" hide-footer>
      <template>
        <p>Su pedido ha sido realizado</p>
      </template>

      <button
        class="btn btn-primary justify-content-end"
        @click="volverAlInicio"
      >
        Ok
      </button>
    </b-modal>
    <legend>Realizar un pedido de lo que sea!</legend>
    <hr />
    <b-card 
      no-body class="b-card" 
      id="seccion1" 
      v-if="seccion == 0"
    >
      <b-card-body>
        <div id="formulario">
          <form>
            <legend>Informacion del pedido</legend>
            <hr />
            <div class="form-row">
              <div class="col-sm-6 col-sm-12">
                <div class="form-group">
                  <label 
                    for="inp-DescPedido" 
                    class="form-label"
                  >¿Qué desea pedir?</label
                  >
                  <textarea
                    class="form-control"
                    id="inp-DescPedido"
                    rows="3"
                    v-model="pedido.descripcion"
                  ></textarea>
                </div>
              </div>
            </div>
            <div class="form-row">
              <div class="col-sm-6 col-sm-12">
                <div class="form-group">
                  <label 
                    for="" 
                    class="form-label"
                  >Ingrese una fotografía</label
                  >
                  <input
                    type="button"
                    class="form-control btn btn-danger"
                    id="btnFoto"
                    :value="imgSeleccionada ? 'Modificar' : 'Agregar'"
                    @click="agregarFoto"
                  />
                </div>
              </div>
            </div>

            <div class="form-row img-center" v-if="imgSeleccionada">
              <div class="col-sm-6 col-sm-12">
                <div class="form-group">
                  <img
                    class="landscape"
                    :src="pedido.base64Img"
                    alt="Imagen del Producto"
                  />
                </div>
              </div>
            </div>
            <hr />
            <div class="form-row">
              <div class="col-sm-6 col-sm-12">
                <div class="form-group">
                  <label class="form-label"> Ubicacion del Negocio</label>
                  <input
                    type="button"
                    class="form-control btn btn-danger mt-4"
                    id="btnDireccion"
                    :value="
                      ubicacionNegocioSeleccionada
                        ? ' Modificar Direccion'
                        : 'Seleccionar Dirección'
                    "
                    @click="agregarDireccion"
                  />
                </div>
              </div>
            </div>
            <div class="form-row" v-if="ubicacionNegocioSeleccionada">
              <div class="col-sm-6 col-sm-12">
                <div class="form-group">
                  <div class="row">
                    <div class="col">
                      <label for="" class="form-label">
                        Dirección Seleccionada: </label
                      ><input
                        type="text"
                        class="form-control-plaintext"
                        readonly
                        name=""
                        id="inpUbicacion"
                        v-model="pedido.ubicacionNegocio.address"
                      />
                    </div>
                    <div class="col">
                      <label for="" class="form-label">
                        referencia Seleccionada :
                      </label>
                      <input
                        type="text"
                        class="form-control-plaintext"
                        readonly
                        name=""
                        id="inpUbicacion"
                        v-model="pedido.ubicacionNegocio.referencia"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </b-card-body>
    </b-card>
    <b-card 
      no-body 
      class="b-card"
      id="seccion2"
      v-if="seccion == 1"
    >
      <b-card-body>
        <div id="formulario">
          <form>
            <legend>Información del destino</legend>
            <hr />
            <div class="form-row">
              <div class="col-sm-6 col-sm-12">
                <div class="form-group">
                  <label 
                    for="inpCalleDestino" 
                    class="form-label"
                  >
                    Calle
                  </label>
                  <input
                    class="form-control"
                    type="text"
                    id="inpCalleDestino"
                    v-model="pedido.ubicacionDestino.calle"
                  />
                </div>
              </div>
            </div>
            <div class="form-row">
              <div class="col-sm-6">
                <div class="form-group">
                  <label 
                  for="" 
                  class="form-label"
                >Número</label>
                  <input
                    type="tel"
                    inputmode="numeric"
                    class="form-control"
                    v-model="pedido.ubicacionDestino.numero"
                  />
                </div>
              </div>
              <div class="col-sm-6">
                <div class="form-group">
                  <label 
                    for="exampleFormControlSelect1" 
                    class="form-label"
                  >
                    Ciudad
                  </label>
                  <select
                    class="form-control"
                    id="slctCiudad"
                    v-model="pedido.ubicacionDestino.ciudad"
                  >
                    <option value="Cordoba">Córdoba</option>
                    <option value="Rio Ceballos">Rio Ceballos</option>
                    <option value="Unquillo">Unquillo</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="form-row">
              <div class="col-sm-6 col-sm-12">
                <div class="form-group">
                  <label 
                    for="" 
                    class="form-label"
                  > Fecha Pedido: </label>
                  <select
                    class="form-control"
                    id="slctCiudad"
                    v-model="pedido.ubicacionDestino.programado"
                  >
                    <option value="0">Lo antes posible</option>
                    <option value="1">Personalizado</option>
                  </select>
                </div>
              </div>
            </div>
            <div
              class="form-row"
              v-if="pedido.ubicacionDestino.programado == 1"
            >
              <div class="col-sm-6 col-sm-12">
                <div class="form-group">
                  <label 
                    for="dtFecha" 
                    class="form-label"
                  >
                    Fecha Pedido:
                  </label>
                  <div class="form-row">
                    <div class="col-sm-6">
                      <input
                        type="date"
                        class="form-control"
                        name=""
                        id="dtFecha"
                        v-model="pedido.ubicacionDestino.fecha"
                      />
                    </div>
                    <div class="col">
                      <select
                        name=""
                        id="selectHora"
                        class="form-control"
                        v-model="pedido.ubicacionDestino.horapedido"
                      >
                        <option value="0" selected>00</option>
                        <option :value="n" v-for="n in 23" :key="n">
                          {{ parse(n) }}
                        </option>
                      </select>
                    </div>
                    <div class="col">
                      <select
                        name=""
                        id="selectMinuto"
                        class="form-control"
                        v-model="pedido.ubicacionDestino.Minutopedido"
                      >
                        .
                        <option value="0" selected>00</option>
                        <option 
                          :value="m" 
                          v-for="m in 59" 
                          :key="m"
                        >
                          {{ parse(m) }}
                        </option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="form-row">
              <div class="col-sm-6 col-sm-12">
                <div class="form-group">
                  <label 
                    for="inp-DescPedido" 
                    class="form-label"
                  >Referencia</label
                  >
                  <textarea
                    class="form-control"
                    id="inp-DescPedido"
                    rows="3"
                    v-model="pedido.ubicacionDestino.referencia"
                  ></textarea>
                </div>
              </div>
            </div>
          </form>
        </div>
      </b-card-body>
    </b-card>
    <b-card 
      no-body 
      class="b-card" 
      id="seccion3" 
      v-if="seccion == 2"
    >
      <b-card-body>
        <div id="formulario">
          <form>
            <legend>Metodo de pago</legend>
            <hr />
            <div class="form-row">
              <div class="col-sm-6 justify-content-between">
                <div class="form-group">
                  <div>
                    <label 
                      for="options" 
                      class="form-label"
                    >
                      Forma de Pago
                    </label>
                  </div>
                  <div
                    class="btn-group btn-group-toggle form-check form-check-inline"
                    data-toggle="buttons"
                  >
                    <label
                      class="btn btn-secondary form-check-input"
                      :class="{ active: pedido.metodoPago.metodo == 0 }"
                    >
                      <input
                        type="radio"
                        name="options"
                        id="option1"
                        value="0"
                        v-model="pedido.metodoPago.metodo"
                      />
                      Efectivo
                    </label>
                    <label
                      class="btn btn-secondary form-check-input"
                      :class="{ active: pedido.metodoPago.metodo == 1 }"
                    >
                      <input
                        type="radio"
                        name="options"
                        id="option2"
                        value="1"
                        v-model="pedido.metodoPago.metodo"
                      />Tarjeta
                    </label>
                  </div>
                </div>
              </div>
              <div class="col-sm-6"  v-if="pedido.metodoPago.metodo == 0">
                <div class="form-group">
                  <label for="inpMonto" class="form-label">
                    Ingrese el monto a pagar
                  </label>
                  <input
                    type="number"
                    class="form-control"
                    id="inpMonto"
                    min="0"
                    max="999999"
                    v-model="pedido.metodoPago.monto"
                  />
                </div>
              </div>
            </div>
            <div 
              class="form-row" 
              v-if="pedido.metodoPago.metodo == 1"
            >
              <div class="col-sm-6">
                <div class="form-group">
                  <label 
                    class="form-label" 
                    for="ccn"
                  >Numero de Tarjeta</label>
                  <input
                    id="ccn"
                    class="form-control"
                    type="tel"
                    inputmode="numeric"
                    pattern="[0-9\s]{13,19}"
                    autocomplete="cc-number"
                    maxlength="19"
                    placeholder="xxxx xxxx xxxx xxxx"
                    v-model="pedido.metodoPago.numeroTarjeta"
                  />
                </div>
              </div>
              <div class="col-sm-6">
                <div class="form-group">
                  <label 
                    for="" 
                    class="form-label"
                  >Nombre y Apellido del Titular</label
                  >
                  <input
                    type="text"
                    class="form-control"
                    v-model="pedido.metodoPago.titular"
                  />
                </div>
              </div>
            </div>
            <div 
              class="form-row" 
              v-if="pedido.metodoPago.metodo == 1"
            >
              <div class="col-sm-6">
                <div class="form-group">
                  <label 
                    for="inpCodSeg" 
                    class="form-label"
                  >Codigo Seguridad</label
                  >
                  <input
                    type="number"
                    class="form-control"
                    min="0"
                    max="999"
                    id="inpCodSeg"
                    v-model="pedido.metodoPago.cvs"
                  />
                </div>
              </div>
              <div class="col-sm-6">
                <div class="form-group">
                  <label 
                    for="dtFechaVencimiento" 
                    class="form-label"
                  >Fecha vencimiento</label
                  >
                  <div class="form-row">
                    <div class="col">
                      <select
                        name="expireMM"
                        id="expireMM"
                        v-model="pedido.metodoPago.vencimientoMes"
                        class="form-control"
                      >
                        <option value="">Mes</option>
                        <option value="01">Enero</option>
                        <option value="02">Febrero</option>
                        <option value="03">Marzo</option>
                        <option value="04">Abril</option>
                        <option value="05">Mayo</option>
                        <option value="06">Junio</option>
                        <option value="07">Julio</option>
                        <option value="08">Agosto</option>
                        <option value="09">Septiembre</option>
                        <option value="10">Octubre</option>
                        <option value="11">Noviembre</option>
                        <option value="12">Diciembre</option>
                      </select>
                    </div>
                    <div class="col">
                      <select
                        name="expireYY"
                        id="expireYY"
                        v-model="pedido.metodoPago.vencimientoAño"
                        class="form-control"
                      >
                        <option value="">Año</option>
                        <option value="21">2021</option>
                        <option value="22">2022</option>
                        <option value="23">2023</option>
                        <option value="24">2024</option>
                        <option value="25">2025</option>
                        <option value="26">2026</option>
                        <option value="27">2027</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </b-card-body>
    </b-card>
    <b-card 
      no-body 
      class="b-card" 
      id="seccion4" 
      v-if="seccion == 3"
    >
      <b-card-body>
        <div class="row resumen">
          <div class="col-sm-6 col-sm-12">
            Pedido:
            <hr />
            <div class="row info">
              <div class="col">
                Descripcion Pedido: {{ pedido.descripcion }}
              </div>
            </div>
            <div class="row info">
              <div 
                class="col" 
                v-if="pedido.base64Img !== ''"
              >
                <div>Fotografía:</div>
                <img
                  :src="pedido.base64Img"
                  class="landscape"
                  id="imgsmall"
                  alt="imagen pedido"
                />
              </div>
            </div>
            <div class="row info">
              <div class="col">
                Ubicacion del Comercio: {{ pedido.ubicacionNegocio.address }};
                Referencia Adicional: {{ pedido.ubicacionNegocio.referencia }}
              </div>
            </div>
            <div class="row info">
              <div class="col">
                Fecha Pedido:
                {{
                  pedido.ubicacionDestino.programado == 0
                    ? "Lo antes Posible"
                    : moment(pedido.ubicacionDestino.fecha).format(
                        "DD/MM/YYYY"
                      ) +
                      " " +
                      pedido.ubicacionDestino.horapedido +
                      ":" +
                      pedido.ubicacionDestino.Minutopedido
                }}
              </div>
            </div>
          </div>

          <div class="col-sm-6 col-sm-12">
            <hr />
            Destinatario:
            <hr />
            <div class="row info">
              <div class="col">Calle: {{ pedido.ubicacionDestino.calle }}</div>
            </div>
            <div class="row info">
              <div class="col">
                Numero: {{ pedido.ubicacionDestino.numero }}
              </div>
            </div>
            <div class="row info">
              <div class="col">
                Ciudad: {{ pedido.ubicacionDestino.ciudad }}
              </div>
            </div>
            <div class="row info">
              <div class="col">
                Referencia: {{ pedido.ubicacionDestino.referencia }}
              </div>
            </div>
          </div>

          <div class="col-sm-6 col-sm-12">
            <hr />
            Metodo de Pago:
            <hr />
            <div class="row info">
              <div class="col">
                Metodo de pago seleccionado:
                {{ pedido.metodoPago.metodo == 0 ? "Efectivo" : "Tarjeta" }}
              </div>
            </div>
            <div class="row info">
              <div class="col">
                Monto del pedido: ${{ pedido.metodoPago.monto }}
              </div>
            </div>

            <div class="row info" v-if="pedido.metodoPago.metodo == 1">
              <div class="col">
                Numero de tarjeta: {{ pedido.metodoPago.numeroTarjeta }}
              </div>
            </div>
            <div class="row info" v-if="pedido.metodoPago.metodo == 1">
              <div class="col">
                Vencimiento: {{ pedido.metodoPago.vencimientoMes }}/{{
                  pedido.metodoPago.vencimientoAño
                }}
              </div>
            </div>
          </div>
        </div>
      </b-card-body>
    </b-card>

    <div class="row mt-4 float-right">
      <div class="col-sm-6 col-sm-12">
        <button
          class="btn btn-danger mr-2"
          v-if="tieneAnterior"
          @click="previousSeccion"
        >
          Anterior
        </button>
        <button
          class="btn btn-danger"
          @click="addSeccion"
          v-if="tieneSiguiente"
        >
          Siguiente
        </button>
        <button
          class="btn btn-primary"
          v-if="seccion == 3"
          @click="confirmarPedido"
        >
          Confirmar pedido!
        </button>
      </div>
    </div>
    <div 
      class="row error" 
      v-for="(error, index) in errors" 
      :key="index"
    >
      <div class="col">• {{ error.error }}</div>
    </div>
  </b-container>
</template>

<script>
import moment from "moment";
import AgregarFotografia from "./fotografia.vue";
import MapaUbicacion from "./MapaUbicacion";

export default {
  name: "LoQueSea",
  components:{MapaUbicacion, AgregarFotografia},
  data() {
    return {
      pedido: {
        descripcion: "",
        ImagenPath: "",
        base64Img: "",
        ubicacionNegocio: {
          address: "",
          referencia: "",
        },
        ubicacionDestino: {
          calle: "",
          numero: "",
          ciudad: "",
          referencia: "",
          programado: 0,
          fecha: "",
          Minutopedido: "",
          horapedido: "",
        },

        metodoPago: {
          metodo: 0,
          monto: 0,
          titular: "",
          numeroTarjeta: "",
          cvs: "",
          vencimientoMes: "",
          vencimientoAño: "",
        },
      },

      seccion: 0,
      errors: [],
    };
  },
  methods: {
    moment: moment,
    agregarFoto: function () {
      this.$bvModal.show("modal-foto");
    },
    OnsuccessCargarFoto: function (event) {
      if (event !== null) {
        var reader = new FileReader();
        reader.onload = () => {
          this.pedido.base64Img = reader.result;
        };
        reader.readAsDataURL(event);
      } else {
        this.pedido.base64Img = event;
      }
      this.$bvModal.hide("modal-foto");
    },
    OnLocationSelected: function (event) {
      console.log();
      this.pedido.ubicacionNegocio = event;
      this.$bvModal.hide("modal-mapas");
    },
    agregarDireccion: function () {
      this.$bvModal.show("modal-mapas");
    },
    confirmarPedido: function () {
      this.$bvModal.show("modal-confirmacion");
    },
    parse: function (numero) {
      return numero < 10 ? "0" + numero : numero;
    },

    validar: function () {
      var seccion = this.seccion;
      const error = { error: "", key: 0 };
      this.errors = [];
      switch (seccion) {
        case 0:
          if (!this.pedido.descripcion.length) {
            var error1 = Object.assign({}, error);
            error1.error = "La descripcion del pedido no puede estar vacio";
            error1.key = 1;

            this.errors.push(error1);
          }
          if (!this.pedido.ubicacionNegocio.address) {
            var error2 = Object.assign({}, error);
            error2.error = "Debe Seleccionar la ubicacion del negocio";
            error2.key = 2;

            this.errors.push(error2);
          }

          break;
        case 1:
          if (!this.pedido.ubicacionDestino.calle) {
            var error3 = Object.assign({}, error);
            error3.error = "La Calle de destino no puede estar vacia";
            error3.key = 3;

            this.errors.push(error3);
          }
          if (!this.pedido.ubicacionDestino.ciudad) {
            var error5 = Object.assign({}, error);
            error5.error = "Seleccione una ciudad Valida";
            error5.key = 5;
            this.errors.push(error5);
          }
          if (this.pedido.ubicacionDestino.programado == 1) {
            if (moment(this.pedido.ubicacionDestino.fecha) < moment()) {
              var error4 = Object.assign({}, error);
              error4.error = "Ingrese una fecha a futuro";
              error4.key = 5;
              this.errors.push(error4);
            }
          }
          break;
        case 2:
          if (this.pedido.metodoPago.metodo == 0 && (this.pedido.metodoPago.monto <= 0 || this.pedido.metodoPago.monto > 999999)) {
            var error6 = Object.assign({}, error);
            error6.error = "Ingrese un monto entre 1$ y 999999$";
            error6.key = 6;
            this.errors.push(error6);
          }
          if (this.pedido.metodoPago.metodo == 1) {
            if (this.pedido.metodoPago.numeroTarjeta.substring(0, 1) != 4) {
              var error7 = Object.assign({}, error);
              error7.error = "Solo se aceptan tarjetas Visa";
              error7.key = 7;
              this.errors.push(error7);
            }

            if (
              this.pedido.metodoPago.cvs < 0 ||
              this.pedido.metodoPago.cvs > 999
            ) {
              var error8 = Object.assign({}, error);
              error8.error = "Código de seguridad inválido";
              error8.key = 8;
              this.errors.push(error8);
            }
            var regex = /[0-9 ]+/;
            if (!regex.test(this.pedido.metodoPago.numeroTarjeta)) {
              var error9 = Object.assign({}, error);
              error9.error = "Tarjeta Invalida";
              error9.key = 9;
              this.errors.push(error9);
            }
            if(this.pedido.metodoPago.titular.length==0){
              var error10 = Object.assign({}, error);
              error10.error = "Ingrese un Titular";
              error10.key = 10;
              this.errors.push(error10);
            }
            if(this.pedido.metodoPago.vencimientoMes.length==0){
              var error11 = Object.assign({}, error);
              error11.error = "Ingrese un mes valido";
              error11.key = 11;
              this.errors.push(error11);
            }
            if(this.pedido.metodoPago.vencimientoAño.length==0){
              var error12 = Object.assign({}, error);
              error12.error = "Ingrese un Año Valido";
              error12.key = 10;
              this.errors.push(error12);
            }

          }
          break;
      }

      return !this.errors.length;
    },

    addSeccion: function () {
      if (this.validar()) this.seccion += 1;
    },
    previousSeccion: function () {
      this.seccion -= 1;
    },
    CerrarModal() {
      this.$bvModal.hide("modal-foto");
    },
    pedidoConfirmado() {
      this.$bvModal.hide("modal-confirmacion");
      this.$bvModal.show("modal-confirmado");
    },
    volverAlInicio() {
      this.$bvModal.hide("modal-confirmado");
      this.$router.push("/");
    },
  },
  computed: {
    imgSeleccionada: (app) => {
      return app.pedido.base64Img && app.pedido.base64Img.length;
    },
    ubicacionNegocioSeleccionada: (app) => {
      return (
        app.pedido.ubicacionNegocio &&
        app.pedido.ubicacionNegocio.address.length > 0
      );
    },
    tieneAnterior: (app) => {
      return app.seccion != 0 && app.seccion > 0;
    },
    tieneSiguiente: (app) => {
      return app.seccion >= 0 && app.seccion < 3;
    },
  },
};
</script>

<style scoped>
.resumen {
  font-family: Consolas, monaco, monospace;
}
.resumen .info {
  text-align: center;
}
.error .col {
  display: block;
  color: red !important;
}
img {
  max-width: 400px;
  max-height: 400px;
}
.landscape {
  height: 120px;
  width: 260px;
}

.img-center {
  text-align: center;
}
</style>